const router = require("express").Router();
const bcrypt = require("bcryptjs");
const dayjs = require("dayjs");
// const crypto = require('crypto');
const User = require("../models/user");
const jwt = require("jsonwebtoken");
// const cookie = require('cookie-parser');
const { loginValidation } = require("../loginValidation");

const dotenv = require("dotenv");

dotenv.config();

// const createToken = (id)=>{
//     return jwt.sign(id , process.env.ACCESS_TOKEN_SECRET);
// }

router.get("/", (req, res) => {
  res.send("LOGIN");
});

router.post("/", async (req, res) => {
  // validating the User's Data
  const { error } = loginValidation(req.body);
  if (error)
    return res.status(400).json({
      message: "Bhai yeh Kya kar tuu..." + error.details[0].message,
      error: true,
    });

  // Checking whether user id exists or not
  const validUser = await User.findOne({ email: req.body.email });
  if (validUser === null)
    return res.status(400).json({
      message: "Yeh Shab Doglapan hain! ....Email Does not exist!",
      error: true,
    });

  if (validUser.isVerified) {
    // Checking whether password is correct or not
    try {
      const validPassword = await bcrypt.compare(
        req.body.password,
        validUser.password
      );
      if (!validPassword)
        return res
          .status(400)
          .json({ message: "Nalla hain kya ?... Wrong Password", error: true });
    } catch (err) {
      res.status(400).json({ message: "Please continue with google" });
      console.log(err.message);
      return;
    }

    //creating payload
    const payload = {
      id: validUser._id,
      isAdmin: validUser.admin,
    };
    //Creating a Token
    const token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET);
    // Storing token in cookie

    res
      .cookie("auth-token", token, {
        httpOnly: true,
        expires: dayjs().add(30, "days").toDate(),
      })
      .json({
        message: "Reh Bhai Bhai ! Logged in",
        error: false,
        isAdmin: validUser.admin,
      });
    // res.header('auth-token', token).send(token) -- Store in header if needed

    // res.send('Reh Bhai Bhai ! Logged in');
  } else {
    res.status(403).send("First Verify Your Account");
  }
});

router.get("/status", async (req, res) => {
  const token = req.cookies["auth-token"];
  try {
    const verified = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    console.log(verified._id);
    console.log(verified);
    res.json({ loginStatus: true, isAdmin: verified.isAdmin });
  } catch (error) {
    res.json({ loginStatus: false });
  }
});

router.post("/authtokenFromGoogleId/", async (req, res) => {
  console.log(req.body);

  try {
    const token = jwt.verify(req.body.token, process.env.ACCESS_TOKEN_SECRET);
    console.log(token);
    const user = await User.findOne({ googleId: token.googleId });
    if (!user) {
      res.status(400).json({ message: "Invalid userId" });
      return;
    }
    const payload = {
      id: user._id,
      isAdmin: user.admin,
    };
    const authToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET);
    res
      .cookie("auth-token", authToken, {
        httpOnly: true,
        expires: dayjs().add(30, "days").toDate(),
      })
      .json({
        message: "Reh Bhai Bhai ! Logged in",
        error: false,
        isAdmin: user.admin,
      });
  } catch (error) {
    console.log(error.message);
    res.status(400).send();
  }
});

module.exports = router;
