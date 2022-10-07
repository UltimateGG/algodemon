const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const { auth } = require('../middleware/authMiddleware');
const User = require('../User');
const { sendDiscordMessage } = require('../utils');


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

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
  res.status(200).json({ token });
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
  let affiliateCode = email.substring(0, 3);
  if (allAffiliateCodes.includes(affiliateCode)) {
    for (let i = 0; i < 10; i++) {
      affiliateCode = email.substring(0, 3) + i;
      if (!allAffiliateCodes.includes(affiliateCode)) break;
    }
  }

  if (allAffiliateCodes.includes(affiliateCode)) throw new Error('Could not generate affiliate code');

  const newUser = new User({ email, password, affiliateCode, admin: false });
  await newUser.save();

  // Send to discord webhook
  await sendDiscordMessage('@everyone - New Affiliate', {
    title: 'Affiliate Registration',
    color: 0x1985ea,
    fields: [
      { name: 'Email', value: email },
      { name: 'Affiliate Code', value: affiliateCode },
    ]
  });

  const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
  res.status(200).json({ token });
}));


module.exports = router;
