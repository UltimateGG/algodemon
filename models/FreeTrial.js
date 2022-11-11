const mongoose = require('mongoose');
const Schema = mongoose.Schema;

  
const FreeTrialSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
});

module.exports = FreeTrial = mongoose.model('trials', FreeTrialSchema);
