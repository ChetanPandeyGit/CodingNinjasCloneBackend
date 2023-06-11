const bcrypt = require('bcrypt'); 
const UserModel = require('../models/userSchema')
const salt =10

const register = async(req,res) => {
    const { signInUsername,signInEmail, signInPassword } = req.body;

    try {
      const existingUser = await UserModel.findOne({ email: signInEmail });
      if (existingUser) {
        return res.status(409).json({ message: 'User already exists' });
      }
  
      const hashedPassword = await bcrypt.hash(signInPassword, 10);
  
      const newUser = new UserModel({ username: signInUsername, email: signInEmail, password: hashedPassword });
      await newUser.save();
  
      res.status(201).json({ message: 'Registration successful' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error occurred during registration' });
    }
}

module.exports = register