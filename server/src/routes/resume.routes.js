const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router();

router.post('/generate', auth, async (req, res) => {
  try {
    const { education, experience, skills } = req.body;
    
    // Here you would implement resume generation logic
    // For now, we'll return a simple JSON structure
    const resume = {
      user: {
        name: req.user.name,
        email: req.user.email
      },
      education,
      experience,
      skills,
      generatedAt: new Date()
    };

    res.json(resume);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;