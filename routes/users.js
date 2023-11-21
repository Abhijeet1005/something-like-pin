const mongoose = require('mongoose');
require('dotenv').config()
const plm = require('passport-local-mongoose')

mongoose.connect(process.env.MONGODB_URI);

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String
  },
  fullname: {
    type: String,
    required: true,
  },
  posts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post'
  }],
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

userSchema.plugin(plm);

module.exports  = mongoose.model('User', userSchema);