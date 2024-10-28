const express = require('express');
const Chat = require('../models/chat.model');
const auth = require('../middleware/auth');
const router = express.Router();

router.post('/rooms', auth, async (req, res) => {
  try {
    const { participantId } = req.body;
    let chat = await Chat.findOne({
      participants: { $all: [req.user._id, participantId] }
    });

    if (!chat) {
      chat = new Chat({
        participants: [req.user._id, participantId],
        messages: []
      });
      await chat.save();
    }

    res.status(201).json(chat);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get('/rooms', auth, async (req, res) => {
  try {
    const chats = await Chat.find({
      participants: req.user._id
    }).populate('participants', 'name email');
    res.json(chats);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get('/rooms/:roomId/messages', auth, async (req, res) => {
  try {
    const chat = await Chat.findOne({
      _id: req.params.roomId,
      participants: req.user._id
    }).populate('messages.sender', 'name');
    
    if (!chat) {
      return res.status(404).json({ message: 'Chat room not found' });
    }
    
    res.json(chat.messages);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;