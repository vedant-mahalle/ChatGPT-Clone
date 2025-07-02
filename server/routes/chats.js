const express = require('express');
const router = express.Router();
const Chat = require('../models/Chat');

// Save or update a chat
router.post('/', async (req, res) => {
  try {
    const { userId, title, messages } = req.body;
    if (!userId || !title || !messages) {
      return res.status(400).json({ error: 'userId, title, and messages are required' });
    }
    const chat = await Chat.findOneAndUpdate(
      { userId, title },
      { $set: { messages, updatedAt: new Date() }, $setOnInsert: { createdAt: new Date() } },
      { upsert: true, new: true }
    );
    res.json(chat);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all chats for a user
router.get('/', async (req, res) => {
  try {
    const { userId } = req.query;
    if (!userId) return res.status(400).json({ error: 'userId is required' });
    const chats = await Chat.find({ userId }).sort({ updatedAt: -1 });
    res.json(chats);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router; 