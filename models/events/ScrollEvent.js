const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const ScrollEvent = new Schema({
 start: {
  type: Number,
  required: true,
  },
  end: {
    type: Number,
    required: true,
  },
  startY: {
    type: Number,
    required: true,
  },
  endY: {
    type: Number,
    required: true,
  },
});


module.exports = ScrollEvent;
