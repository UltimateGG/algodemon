const express = require('express');
const router = express.Router();

const User = require('./User');

router.get('/users', async (req, res) => {
  try {
    const users = await User.find({}).select('-password');
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/create', async (req, res) => {
  try {
    const { email, password, affiliateCode, admin } = req.body;
    const user = await User.findOne({ $or: [{ email }, { affiliateCode }] });

    if (user) return res.status(400).json({ message: 'Email/code already registered', error: true });

    const newUser = new User({ email, password, affiliateCode, admin });
    await newUser.save();

    res.status(200).json({ message: 'User created' });
  } catch (err) {
    res.status(500).json({ message: err.message, error: true });
  }
});

router.post('/edit', async (req, res) => {
  try {
    const { id, email, password, affiliateCode, admin } = req.body;
    const user = await User.findById(id);

    if (!user) return res.status(400).json({ message: 'User not found', error: true });

    user.email = email;
    if (password) user.password = password; // Only update if password is provided
    user.affiliateCode = affiliateCode;
    user.admin = admin;

    await user.save();
    res.status(200).json({ message: 'User updated' });
  } catch (err) {
    res.status(500).json({ message: err.message, error: true });
  }
});

router.post('/delete', async (req, res) => {
  try {
    const { id } = req.body;
    const user = await User.findById(id);

    if (!user) return res.status(400).json({ message: 'User not found', error: true });

    console.log('Admin Deleted:', user);
    await user.delete();
    res.status(200).json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message, error: true });
  }
});

router.post('/pay', async (req, res) => {
  try {
    const { id, username } = req.body;
    const user = await User.findById(id);

    if (!user) return res.status(400).json({ message: 'User not found', error: true });

    const referral = user.referrals.find(r => r.username === username);

    if (!referral) return res.status(400).json({ message: 'Referral not found', error: true });

    referral.paidOut = true;

    await user.save();
    res.status(200).json({ message: 'Referral paid out' });
  } catch (err) {
    res.status(500).json({ message: err.message, error: true });
  }
});

module.exports = router;
