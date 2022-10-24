const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const User = require('../models/User');
const Session = require('../models/Session');
const logger = require('../utils/logging');


router.get('/users', asyncHandler(async (req, res) => {
  const users = await User.find({}).select('-password');
  res.status(200).json(users);
}));

router.post('/edit', asyncHandler(async (req, res) => {
  const { id, email, password, affiliateCode, admin } = req.body;
  const user = await User.findById(id);

 if (!user) throw new Error('User not found');
 if (!email || email.length > 150 || (password && password.length > 30)) throw new Error('Invalid data');

  user.email = email;
  if (password) user.password = password; // Only update if password is provided
  user.affiliateCode = affiliateCode;
  user.admin = admin;

  await user.save();
  res.status(200).json({ message: 'User updated' });
}));

router.post('/delete', asyncHandler(async (req, res) => {
  const user = await User.findById(req.body.id);

  if (!user) throw new Error('User not found');

  await user.delete();
  
  logger.logWarn(`User ${user.email} deleted by admin ${req.user.email}`, user);
  res.status(200).json({ message: 'User deleted' });
}));

router.post('/pay', asyncHandler(async (req, res) => {
  const { id, username } = req.body;

  const user = await User.findById(id);
  if (!user) throw new Error('User not found');

  const referral = user.referrals.find(r => r.username === username);
  if (!referral) throw new Error('Referral not found');

  referral.paidOut = true;
  await user.save();

  res.status(200).json({ message: 'Referral paid out' });
}));

const getDeviceType = (session) => {
  if (session.device.screenWidth > 1000) return 'Desktop';
  if (session.device.screenWidth > 600) return 'Tablet';
  return 'Mobile';
}

router.get('/sessions', asyncHandler(async (req, res) => {
  const maxItemsPerPage = 25;
  const page = parseInt(req.query.page) || 1;
  const skip = (page - 1) * maxItemsPerPage;
  const count = await Session.countDocuments();
  const sort = (req.query.sort || 'time').toLowerCase();

  const sessions = await Session.find({}).sort({ createdAt: -1 }).populate('user');

  if (sort === 'event count') {
    sessions.sort((a, b) => b.events.length - a.events.length);
  } else if (sort === 'duration') {
    sessions.sort((a, b) => (new Date(a.updatedAt || 0).getTime() - a.start) - (new Date(b.updatedAt || 0).getTime() - b.start)).reverse();
  } else if (sort === 'purchased') {
    sessions.sort((a, b) => {
      const aPurchase = a.events.find(e => e.type === 'purchase');
      const bPurchase = b.events.find(e => e.type === 'purchase');
      if (aPurchase && bPurchase) return new Date(bPurchase.time).getTime() - new Date(aPurchase.time).getTime();
      if (aPurchase) return -1;
      if (bPurchase) return 1;
      return 0;
    });
  }

  const pageViews = [];
  for (const session of sessions)
      for (const event of session.events)
        if (event.type === 'pageview') {
          if (pageViews.find(p => p.page === event.page)) {
            pageViews.find(p => p.page === event.page).views++;
          } else {
            pageViews.push({ page: event.page, views: 1 });
          }
        }
  pageViews.sort((a, b) => b.views - a.views);
  
  const devices = [];
  for (const session of sessions)
    if (session.device) {
      if (devices.find(d => d.name === getDeviceType(session))) {
        devices.find(d => d.name === getDeviceType(session)).sessions++;
      } else {
        devices.push({ name: getDeviceType(session), sessions: 1 });
      }
    }
  
  devices.sort((a, b) => b.sessions - a.sessions);

  const avgDuration = sessions.reduce((a, b) => a + (new Date(b.updatedAt || 0).getTime() - b.start), 0) / sessions.length;
  const purchases = sessions.filter(s => s.events.find(e => e.type === 'purchase')).length;
  const conversionRate = purchases / sessions.length * 100;
  
  sessions.splice(0, skip);
  sessions.splice(maxItemsPerPage);

  res.status(200).json({
    maxItemsPerPage,
    totalPages: Math.ceil(count / maxItemsPerPage),
    totalSessions: count,
    pageViews,
    devices,
    avgDuration,
    conversionRate,
    sessions,
  });
}));

router.post('/sessions/delete', asyncHandler(async (req, res) => {
  const session = await Session.findById(req.body.id);
  if (!session) throw new Error('Session not found');

  await session.delete();
  res.status(200).json({ message: 'Session deleted' });
}));


module.exports = router;
