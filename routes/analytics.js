const express = require('express');
const router = express.Router();
const Session = require('../models/Session');
const SESSION_TIMEOUT_MS = 30 * 60 * 1000; // 30 minutes of inactivity before a session is considered inactive


const getSession = async (req) => {
  const session = await Session.findOne({
    ipAddress: req.ip,
    updatedAt: { $gt: new Date(Date.now() - SESSION_TIMEOUT_MS) },
  });
  
  return session;
}

const onSessionStart = async (req, event) => {
  if (await getSession(req)) return;

  const { start } = event.data;
  const { userAgent, screenWidth, screenHeight, platform, vendor, language, isBrave } = event.data.device;

  if (typeof userAgent !== 'string' || typeof screenWidth !== 'number' || typeof screenHeight !== 'number' || typeof platform !== 'string' || typeof vendor !== 'string' || typeof language !== 'string' || typeof isBrave !== 'boolean')
    return;

  const newSession = new Session({
    start,
    ipAddress: req.ip,
    device: {
      userAgent,
      screenWidth,
      screenHeight,
      platform,
      vendor,
      language,
      isBrave,
    },
    user: req.user ? req.user._id : undefined,
  });

  newSession.save();
}

const onPageView = async (session, event) => {
  const newEvent = {
    type: 'pageview',
    timestamp: event.timestamp,
    data: {
      page: event.data.page,
    }
  }

  console.log('on page view')
  session.events.push(newEvent);
  session.save();
}

const onClick = async (session, event) => {
  const { x, y, target, page } = event.data;
  let { isButton, tagName, text } = target;

  if (typeof page !== 'string' || typeof x !== 'number' || typeof y !== 'number' || typeof isButton !== 'boolean' || typeof tagName !== 'string' || typeof text !== 'string')
    return;
  if (text.length > 300)
    text = text.substring(0, 300);

  const newEvent = {
    type: 'click',
    timestamp: event.timestamp,
    data: {
      page,
      target: {
        isButton,
        tagName,
        text
      },
      x: event.data.x,
      y: event.data.y,
    }
  }

  session.events.push(newEvent);
  session.save();
}

const onScroll = async (session, event) => {
  const { page, start, end, startY, endY } = event.data;

  if (typeof page !== 'string' || typeof start !== 'number' || typeof end !== 'number' || typeof startY !== 'number' || typeof endY !== 'number')
    return;

  const newEvent = {
    type: 'scroll',
    timestamp: event.timestamp,
    data: {
      page,
      start,
      end,
      startY,
      endY,
    }
  }

  session.events.push(newEvent);
  session.save();
}

const xorConversion = (str, key) => {
  const key2 = key.split('').map((c) => c.charCodeAt(0));
  let s = '';

  for (let i = 0; i < str.length; i++)
    s += String.fromCharCode(str.charCodeAt(i) ^ key2[i % key2.length]);

  return s;
}

router.post('/u', async (req, res) => {
  res.status(200).end();

  try {
    const key = (req.body.v ^ 0x26af ^ req.body.r) + req.body.ldap + String.fromCharCode(req.body.r);
    const data = xorConversion(req.body.d, key);
    const json = JSON.parse(data);

    if (json.type === 'start') return onSessionStart(req, json);
      const session = await getSession(req);
      if (!session) return;

      if (json.type === 'pageview') return onPageView(session, json);
      else if (json.type === 'click') return onClick(session, json);
      else if (json.type === 'scroll') return onScroll(session, json);
  } catch (e) {}
});


module.exports = router;
