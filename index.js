const express = require("express");
const cors = require("cors");
const route = require("./routes/route");
const connection = require("./connection/db");
const port = 3000;
const session = require("express-session");
const jwt = require("jsonwebtoken");
const secretKey = "@Chetan123";
const CourseModel = require("./models/courseSchema");
const Razorpay = require('razorpay');
const router = require("./routes/router");


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "https://codingninjasclonefrontend.onrender.com/" }));
//app.options('/login', cors({ origin: "https://codingninjasclonefrontend.onrender.com/" }));
app.use("/", cors({ origin: "https://codingninjasclonefrontend.onrender.com/" }), route);
app.use('/', cors({ origin: "https://codingninjasclonefrontend.onrender.com/" }),router)

app.use(
  session({
    secret: "your_session_secret", 
    resave: false,
    saveUninitialized: true,
  })
);

app.get("/",  (req, res) => {
      res.send('This is Backend Server of Coding Ninjas Clone (Chetan Pandey) ')
});

app.get("/courses", async (req, res) => {
  try {
    const courses = await CourseModel.find();
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: "Error fetching courses." });
  }
});

app.get('/courses/search', async (req, res) => {
    const { keyword } = req.query;
    try {
      const courses = await CourseModel.find({
        $or: [
          { name: { $regex: keyword, $options: 'i' } },
          { description: { $regex: keyword, $options: 'i' } },
        ],
      });
      res.json(courses);
    } catch (error) {
      res.status(500).json({ message: 'Error searching courses.' });
    }
  });
  
app.get("/protected-route", authenticateToken, (req, res) => {
  res.json({
    message: "You have accessed the protected route.",
    user: req.user,
  });
});

function authenticateToken  (req, res, next)  {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res
      .status(401)
      .json({ message: "Authentication token is required." });
  }
  try {
    const decoded = jwt.verify(token, secretKey);
    console.log(decoded);
    req.user = decoded.username;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid authentication token." });
  }
};

app.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: "Error occurred during logout" });
    } else {
      res.json({ message: "Logout successful" });
    }
  });
});

app.listen(port, async () => {
  try {
    await connection();
    console.log(`Server is running on port ${port}`);
  } catch (err) {
    console.log(err);
  }
});
