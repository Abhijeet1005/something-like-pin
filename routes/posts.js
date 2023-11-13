const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/pinterest')

const postSchema = new mongoose.Schema({
  postText: {
    type: String,
    required: true,
  },
  currentDate: {
    type: Date,
    default: Date.now,
  },
  currentTime: {
    type: String,
    default: () => new Date().toLocaleTimeString(), 
  },
  likes: {
    type: Array,
    default: [],
  },
});

module.exports = mongoose.model('Post', postSchema);