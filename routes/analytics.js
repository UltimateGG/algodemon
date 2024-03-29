const WSServer = require('ws').Server;
const Session = require('../models/Session');
const User = require('../models/User');
const { logError, logInfo } = require('../utils/logging');
const SESSION_TIMEOUT_MS = 15 * 60 * 1000; // 15 minutes of inactivity before a session is considered inactive


const getSession = async (req) => {
  const session = await Session.findOne({
    ipAddress: req.ip,
    updatedAt: { $gt: new Date(Date.now() - SESSION_TIMEOUT_MS) },
  });
  
  return session;
}

const onSessionStart = async (session, req, event) => {
  if (session) return;

  const { start, startUrl } = event.data;

  const newSession = new Session({
    start,
    ipAddress: req.ip,
    user: req.user ? req.user._id : undefined,
    startUrl,
    device: event.data.device,
  });

  await newSession.save();
}

const xorConversion = (str, key) => {
  const key2 = key.split('').map((c) => c.charCodeAt(0));
  let s = '';

  for (let i = 0; i < str.length; i++)
    s += String.fromCharCode(str.charCodeAt(i) ^ key2[i % key2.length]);

  return s;
}

const processEvent = (event, req) => {
  return new Promise(async (resolve, reject) => {
    const session = await getSession(req);
    const data = xorConversion(event.d, (event.v ^ 0x26af ^ event.r) + event.ldap + String.fromCharCode(event.r));
    const json = JSON.parse(data);

    if (json.type === 'start') {
      await onSessionStart(session, req, json);
      return resolve();
    }

    if (!session && (!req.user || !req.user.admin))
      logError(`Received event from ${req.ip} without a session - ${json.type}`);
    if (!session) return resolve();
    if (json.type === 'login') {
      session.user = json.data.user;

      const user = await User.findById(json.data.user);
      if (user && user.admin) {
        await session.remove();
        return reject();
      }
    }
  
    if (json.type === 'purchase') logInfo(`Received purchase event`);
    session.events.push(json);
    session.markModified('events');
    await session.save();
    resolve();
  });
}

const wss = new WSServer({ noServer: true });

wss.on('connection', (ws, req, user) => {
  ws.on('message', async msg => {
    try {
      msg = JSON.parse(msg.toString());
      
      if (req.user && req.user.admin) return;

      for (let i = 0; i < msg.length; i++)
        await processEvent(msg[i], req);
    } catch (e) {
      logError('Error processing analytics events', e);
    }
  });
});


module.exports = wss;
