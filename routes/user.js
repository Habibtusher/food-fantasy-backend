const router = require("express").Router();
const User = require("../models/userSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const checkLogin = require("../middlewares/checkLogin");


//register
router.post("/register", async (req, res) => {
  try {
    // new secure Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // Create new user
    const newUser = await new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });

    console.log(newUser);
    // save and return response
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });

    !user && res.status(400).json("No user found");

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (validPassword) {
      // token generate
      var token = jwt.sign(
        {
          username: user.username,
          userid: user._id,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "1h",
        }
      );
      res.status(200).json({
        "access_token": token,
        "message": "Logged in successfully",
      });
    }
    res.status(400).json("Invalid password");

  } catch (err) {
    res.status(500).json("err");
  }
});

//get-all user
router.get("/all-user", (req, res) => {
 
    User.find({}).then((result) => {
      res.send(result);
    });

});

module.exports = router;
