const mongoose = require('mongoose');
const CommentSchema = new mongoose.Schema({
  content: String,
  authorId: String,
  authorName: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});
const PostSchema = new mongoose.Schema({
  title: String,
  content: String,
  authorId: String,
  authorName: String,
  avatar: String,
  likes: [String],
  comments: [CommentSchema],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Post', PostSchema);
