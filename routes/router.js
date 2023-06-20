const express = require('express');
const router = express.Router();
const Razorpay = require('razorpay');
const UserModel = require('../models/userSchema');
const Course = require('../models/courseSchema');

router.post('/user/:userId/enrollCourse/:courseId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const courseId = req.params.courseId;

    const user = await UserModel.findById(userId);
    const course = await Course.findById(courseId);

    if (!user || !course) {
      return res.status(404).json({ message: 'User or course not found' });
    }

    user.courses.push(course);
    await user.save();

    res.status(200).json({ message: 'Course enrolled successfully' });
  } catch (error) {
    console.error('Error enrolling in the course:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.get('/user/:userId/enrolledCourses', async (req, res) => {
  try {
    const userId = req.params.userId;

    const user = await UserModel.findById(userId).populate('courses');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ courses: user.courses });
  } catch (error) {
    console.error('Error fetching enrolled courses:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.get('/user/dashboard/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await UserModel.findById(userId);
      console.log(user);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({user});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/user/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({user});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

const razorpay = new Razorpay({
  key_id: 'rzp_test_HKvXR6PLLW4ZtV',
  key_secret: 'ANlg1ifa4DzCpHFbaCrvr1bS', 
});

router.post('/order', (req, res) => {
  const { courseId, amount } = req.body;

  const options = {
    amount: amount *100, 
    currency: 'INR',
    receipt: 'receipt_order_123', 
    payment_capture: 1, 
  };

  razorpay.orders.create(options, (err, order) => {
    if (err) {
      console.error('Razorpay order creation error:', err);
      return res.status(500).json({ error: 'Unable to create Razorpay order' });
    }

    res.json({ orderId: order.id });
  });
});

module.exports = router;