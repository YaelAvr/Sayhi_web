const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  displayName: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  picture: {
    type: String,
    // required: true
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'other'],
    required: true
  },
  birthday: {
    type: String,
    required: true
  },
  isDarkMode: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model('User', userSchema);
