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

router.get('/sessions', asyncHandler(async (req, res) => {
  const maxItemsPerPage = 25;
  const page = parseInt(req.query.page) || 1;
  const skip = (page - 1) * maxItemsPerPage;
  const count = await Session.countDocuments();

  const sessions = await Session.find({}).sort({ createdAt: -1 }).skip(skip).limit(maxItemsPerPage).populate('user');
  res.status(200).json({
    maxItemsPerPage,
    totalPages: Math.ceil(count / maxItemsPerPage),
    totalSessions: count,
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
