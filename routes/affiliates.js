const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const { getChannel } = require('../discord');
const { auth } = require('../middleware/authMiddleware');
const User = require('../models/User');
const Discord = require('discord.js');


router.get('/', asyncHandler(async (req, res) => {
  const code = req.query.code;
  if (!code) throw new Error('Invalid code');

  const user = await User.findOne({ affiliateCode: code });
  if (!user) throw new Error('Invalid code');

  res.status(200).json({ message: 'Valid code' });
}));

router.get('/user', auth, async (req, res) => res.status(200).json(req.user));

router.post('/login', asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user || password !== user.password)
    throw new Error('Invalid email or password');

  user.password = undefined;
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
  res.status(200).json({ token, user });
}));

router.post('/register', asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || email.length < 5 || email.length > 120 || !email.includes('@')) throw new Error('Email invalid');
  if (!password || password.length < 8 || password.length > 30) throw new Error('Password must be between 8 and 30 characters');

  const user = await User.findOne({ email });
  if (user) throw new Error('Email already registered');

  let allAffiliateCodes = await User.find({});
  allAffiliateCodes = allAffiliateCodes.map(user => user.affiliateCode).filter(code => code);

  // Generate affiliate code
  let affiliateCode = '';
  for (let i = 0; i < 200; i++) {
    affiliateCode = generateCode(3);

    if (!allAffiliateCodes.includes(affiliateCode)) break;
  }

  if (allAffiliateCodes.includes(affiliateCode)) throw new Error('Could not generate affiliate code');

  const newUser = new User({ email, password, affiliateCode, admin: false });
  await newUser.save();

  getChannel().send({ content: '**New Affiliate**', embeds: [
    new Discord.EmbedBuilder()
      .setTitle('New Registration')
      .setColor(0x1985ea)
      .addFields({ name: 'Email', value: email }, { name: 'Affiliate Code', value: affiliateCode })
      .setTimestamp()
  ]});

  const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
  res.status(200).json({ token });
}));

function generateCode(len) {
  const chars = 'ABCDEFGHJKLMNPRSTUVWXYZ123456789';
  let code = '';

  for (let i = 0; i < len; i++)
    code += chars.charAt(Math.floor(Math.random() * chars.length));

  return code;
}


module.exports = router;
