const jwt = require('jsonwebtoken');
const User = require('../models/User');


const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findOne({ _id: decoded.id });
    if (!user) return res.status(400).json({ message: 'Invalid token' });

    user.password = undefined;
    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
}

const authSoft = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findOne({ _id: decoded.id });
    if (!user) return next();

    user.password = undefined;
    req.user = user;
    next();
  } catch (err) {
    next();
  }
}

const adminAuth = (req, res, next) => {
  if (req.user.admin)
    next();
  else
    res.status(401).json({ message: 'Not authorized' });
}

module.exports = {
  auth,
  authSoft,
  adminAuth,
}
