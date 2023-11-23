const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  image: {
    type: String,
  },
  postText: {
    type: String,
    required: true,
  },
  currentDate: {
    type: Date,
    default: Date.now,
  },
  // currentTime: {
  //   type: String,
  //   default: () => new Date().toLocaleTimeString(),
  // },
  likes: {
    type: Array,
    default: [],
  },
});

module.exports = mongoose.model('Post', postSchema);