const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
  type: { type: String, enum: ['query', 'response'], required: true },
  content: { type: String, required: true }
}, { _id: false });

const ChatSchema = new mongoose.Schema({
  userId: { type: String, required: true, index: true },
  title: { type: String, required: true },
  messages: [MessageSchema],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

ChatSchema.index({ userId: 1, title: 1 }, { unique: true });

module.exports = mongoose.model('Chat', ChatSchema); 