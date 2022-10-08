const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const ReferralSchema = new Schema({
  username: { // TradingView username of the buyer
    type: String,
    required: true,
  },
  amount: { // Amount the affiliate earned
    type: Number,
    required: true
  },
  paidOut: { // If we have paid the affiliate for this
    type: Boolean,
    default: false
  },
  date: { // Date the referral was made
    type: Date,
    default: Date.now
  }
});
  
const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  admin: {
    type: Boolean,
    default: false
  },
  affiliateCode: {
    type: String,
    required: false,
    unique: true,
  },
  referrals: {
    type: [ReferralSchema],
    required: false,
    default: []
  }
});

module.exports = User = mongoose.model('users', UserSchema);
