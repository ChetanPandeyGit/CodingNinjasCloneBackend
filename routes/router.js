const express = require('express');
const router = express.Router();
const Razorpay = require('razorpay');
const UserModel = require('../models/userSchema');

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