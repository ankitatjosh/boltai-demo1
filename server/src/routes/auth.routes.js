const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const { email, password, name, role } = req.body;
    const user = new User({ email, password, name, role });
    await user.save();
    
    const token = jwt.sign({ userId: user._id }, 'your-secret-key', { expiresIn: '24h' });
    res.status(201).json({ token, user: { id: user._id, email, name, role } });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id }, 'your-secret-key', { expiresIn: '24h' });
    res.json({ token, user: { id: user._id, email, name: user.name, role: user.role } });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;