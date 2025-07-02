const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mailSchema = new Schema({
  from: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  to: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  subject: {
    type: String,
    default: ''
  },
  body: {
    type: String,
    default: ''
  },
  links: [{
    type: String
  }],
  labels: [{
    type: Schema.Types.ObjectId,
    ref: 'Label'
  }],
  time: {
    type: Date,
    default: Date.now
  },
  fromName: String,
  toName: String,
  fromUserName: String,
  toUserName: String,
  fromPicture: String,
  isStarred: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Mail', mailSchema);
