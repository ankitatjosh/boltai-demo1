const express = require('express');
const Session = require('../models/session.model');
const auth = require('../middleware/auth');
const router = express.Router();

router.post('/', auth, async (req, res) => {
  try {
    const { mentorId, date, topic } = req.body;
    const session = new Session({
      studentId: req.user._id,
      mentorId,
      date,
      topic
    });
    await session.save();
    res.status(201).json(session);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get('/mentor', auth, async (req, res) => {
  try {
    const sessions = await Session.find({ mentorId: req.user._id })
      .populate('studentId', 'name email')
      .sort({ date: 1 });
    res.json(sessions);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get('/student', auth, async (req, res) => {
  try {
    const sessions = await Session.find({ studentId: req.user._id })
      .populate('mentorId', 'name email expertise')
      .sort({ date: 1 });
    res.json(sessions);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.patch('/:id/status', auth, async (req, res) => {
  try {
    const { status } = req.body;
    const session = await Session.findOneAndUpdate(
      { _id: req.params.id, mentorId: req.user._id },
      { status },
      { new: true }
    );
    if (!session) {
      return res.status(404).json({ message: 'Session not found' });
    }
    res.json(session);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;