const mongoose = require('mongoose');
const Course = require('./courseSchema');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  courses: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: Course
  }],
  progress: {
    type: Number,
    default: 0
  }
});

const UserModel = mongoose.model('collection', userSchema);

module.exports = UserModel;