const mongoose = require('mongoose');
require("custom-env").env(process.env.NODE_ENV, "./config");

const connectDB = async () => {
  try {
    mongoose.connect(process.env.CONNECTION_STRING, {
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