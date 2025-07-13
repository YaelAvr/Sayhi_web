const mongoose = require('mongoose');
const path = require('path'); 
require('custom-env').env(true, __dirname, 'config');
// require("custom-env").env('local', './config');

const connectDB = async () => {
  try {
    console.log("CONNECTION_STRING: "+process.env.CONNECTION_STRING);
    
    mongoose.connect(process.env.CONNECTION_STRING , {
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