const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const User = require('../User');
const { sendDiscordMessage } = require('../utils');


router.get('/', asyncHandler(async (req, res) => {
  const code = req.query.code;
  if (!code) throw new Error('Invalid code');

  const user = await User.findOne({ affiliateCode: code });
  if (!user) throw new Error('Invalid code');

  res.status(200).json({ message: 'Valid code' });
}));

router.post('/login', asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user || password !== user.password)
    throw new Error('Invalid email or password');

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
  res.status(200).json({ token });
}));

router.post('/register', asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (email.length > 120) throw new Error('Email too long');
  if (password.length < 8 || password.length > 30) throw new Error('Password must be between 8 and 30 characters');

  const user = await User.findOne({ email });
  if (user) throw new Error('Email already registered');
  
  // Generate affiliate code
  // TODO

  // Send to discord webhook
  await sendDiscordMessage('@everyone - New Affiliate', {
    title: 'Affiliate Registration',
    color: 0x13d32f,
    fields: [
      { name: 'Email', value: email },
      { name: 'Affiliate Code', value: 'TODO' },
    ]
  });

  return res.status(200).json({ message: 'Registration successful' });
}));


module.exports = router;
