const WSServer = require('ws').Server;
const Session = require('../models/Session');
const SESSION_TIMEOUT_MS = 15 * 60 * 1000; // 15 minutes of inactivity before a session is considered inactive


const getSession = async (req) => {
  const session = await Session.findOne({
    ipAddress: req.socket.remoteAddress,
    updatedAt: { $gt: new Date(Date.now() - SESSION_TIMEOUT_MS) },
  });
  
  return session;
}

const onSessionStart = async (session, req, event) => {
  if (session) return;

  const { start } = event.data;
  const { userAgent, screenWidth, screenHeight, platform, vendor, language, isBrave } = event.data.device;

  const newSession = new Session({
    start,
    ipAddress: req.socket.remoteAddress,
    user: req.user ? req.user._id : undefined,
    device: {
      userAgent,
      screenWidth,
      screenHeight,
      platform,
      vendor,
      language,
      isBrave,
    }
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

const wss = new WSServer({ noServer: true });

wss.on('connection', (ws, req, user) => {
  ws.on('message', async msg => {
    try {
      msg = JSON.parse(msg.toString());

      for (let i = 0; i < msg.length; i++)
        await processEvent(msg[i], req);
    } catch (e) {
      console.error(e); // TODO
    }
  });
});


const processEvent = async (event, req) => {
  const data = xorConversion(event.d, (event.v ^ 0x26af ^ event.r) + event.ldap + String.fromCharCode(event.r));
  const json = JSON.parse(data);

  console.log('EVENT: ' + json.type);
  const session = await getSession(req);

  if (json.type === 'start') return await onSessionStart(session, req, json);
  if (!session) return;

  session.events.push(json);
  await session.save();
}


module.exports = wss;
