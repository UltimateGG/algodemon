const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const PurchaseEvent = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    required: false,
    ref: 'users',
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  zip: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  affiliateCode: {
    type: String,
    required: true,
  },
  stripePaymentIntentId: {
    type: String,
    required: true,
  },
});


module.exports = PurchaseEvent;
