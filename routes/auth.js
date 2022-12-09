const express = require('express');
const { auth } = require('../middleware/authMiddleware');
const User = require('../models/User');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');


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


module.exports = router;
