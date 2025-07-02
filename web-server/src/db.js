const mongoose = require('mongoose');
const path = require('path'); 
require('custom-env').env(true, __dirname, 'config');
// require("custom-env").env('local', './config');

const connectDB = async () => {
  try {
    mongoose.connect(process.env.CONNECTION_STRING ||'mongodb://localhost:27017/myapp', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
};

module.exports = connectDB;