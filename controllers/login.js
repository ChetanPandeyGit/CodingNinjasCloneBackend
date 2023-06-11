const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt'); 
const UserModel = require('../models/userSchema')
const secretKey = '@Chetan123';

const login = async(req,res) => {
    const { email, password } = req.body;
    try {
        const user = await UserModel.findOne({ email });
        if (!user) {
          return res.status(401).json({ message: 'Invalid username or password' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
          return res.status(401).json({ message: 'Invalid username or password' });
        }
        const userId= user._id;
        const payload = {
            userid: user._id,
            username: user.username,
          };

        const token = jwt.sign(payload, secretKey, { expiresIn: '6h' });
    
        res.json({ message: 'Login successful', token , userId});
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error occurred during login' });
      }
    };
    

module.exports = login

