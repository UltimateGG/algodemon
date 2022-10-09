const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const SignUpEvent = new Schema({
  email: {
    type: String,
    required: true,
  },
  passwordLength: {
    type: Number,
    required: true,
  },
});


module.exports = SignUpEvent;
