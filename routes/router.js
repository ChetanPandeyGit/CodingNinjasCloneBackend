const express = require('express');
const router = express.Router();
const UserModel = require('../models/userSchema');

router.get('/user/dashboard/:userId', async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await UserModel.findById(userId).populate('courses');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

router.get('/user/:userId', async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;