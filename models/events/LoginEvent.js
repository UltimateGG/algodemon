const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const LoginEvent = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  }
});


module.exports = LoginEvent;
