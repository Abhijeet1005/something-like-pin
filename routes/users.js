const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/pinterest');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  posts: [],
  email: {
    type: String,
    required: true,
    unique: true,
  },
  dp: {
    type: String,
    default: null,
  },
});

module.exports  = mongoose.model('User', userSchema);