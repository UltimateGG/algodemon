const mongoose = require('mongoose');
const ClickEvent = require('./events/ClickEvent');
const Schema = mongoose.Schema;
const logger = require('../utils/logging');
const ScrollEvent = require('./events/ScrollEvent');
const LoginEvent = require('./events/LoginEvent');
const SignUpEvent = require('./events/SignUpEvent');
const PurchaseEvent = require('./events/PurchaseEvent');


const EventSchema = new Schema({
  type: {
    type: String,
    enum: ['pageview', 'click', 'scroll', 'login', 'logout', 'signup', 'purchase'],
    required: true,
  },
  timestamp: {
    type: Number,
    required: true,
  },
  page: {
    type: String,
    required: true,
  },
}, { discriminatorKey: 'type' });

const SessionSchema = new Schema({
  start: {
    type: Number,
    required: true,
  },
  ipAddress: {
    type: String,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    required: false,
    ref: 'users',
  },
  startUrl: {
    type: String,
    required: true,
  },
  device: {
    userAgent: {
      type: String,
      required: true,
    },
    screenWidth: {
      type: Number,
      required: true,
    },
    screenHeight: {
      type: Number,
      required: true,
    },
    platform: {
      type: String,
      required: true,
    },
    vendor: {
      type: String,
      required: true,
    },
    language: {
      type: String,
      required: true,
    },
    timezone: {
      type: String,
      required: true,
    },
    isBrave: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  events: {
    type: [EventSchema],
    required: true,
    default: [],
    validate: [(val) => val.length <= 1500, 'Maximum events reached'],
    _id: false,
  }
}, { timestamps: true });

const getBaseSchema = (type) => {
  return new Schema({
    data: {
      type,
      required: true,
      validate: [(val) => JSON.stringify(val).length <= 5048, 'Event data too long'],
      _id: false,
    }
  });
}

SessionSchema.path('events').discriminator('click', getBaseSchema(ClickEvent));
SessionSchema.path('events').discriminator('scroll', getBaseSchema(ScrollEvent));
SessionSchema.path('events').discriminator('login', getBaseSchema(LoginEvent));
SessionSchema.path('events').discriminator('signup', getBaseSchema(SignUpEvent));
SessionSchema.path('events').discriminator('purchase', getBaseSchema(PurchaseEvent));

SessionSchema.post('save', (error, doc, next) => {
  if (error.name === 'ValidationError') {
    logger.logError('Error saving Session schema:', error.message);
  } else {
    logger.logError('Error saving Session schema:', error);
    next(error);
  }
});

module.exports = Session = mongoose.model('sessions', SessionSchema);
