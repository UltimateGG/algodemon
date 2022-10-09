const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const ClickEvent = new Schema({
  target: {
    isButton: {
      type: Boolean,
      required: true,
    },
    tagName: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
  },
  x: {
    type: Number,
    required: true,
  },
  y: {
    type: Number,
    required: true,
  },
});


module.exports = ClickEvent;
