const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const saltRounds = 10;
const User = require("../Models/User");
const jwt = require("jsonwebtoken");

router.post("/", async (req, res) => {
  const { email, password: plainTextPassword } = req.body;
  const userData = await User.find({ email: email });
  if (userData.length === 0) {
    res.status(400).json({
      Error: "Unregistered email address",
    });
  } else {
    const match = await bcrypt.compare(plainTextPassword, userData[0].password);

    if (!match) {
      res.status(400).json({
        Error: "IncorrectPassword",
      });
    } else {
      const token = jwt.sign(
        { id: userData[0].id, iat: Date.now() },
        process.env.ACCESS_TOKEN,
        {
          expiresIn: parseInt(process.env.JWT_TIMEOUT_SECONDS) * 1000,
        }
      );
      res.status(200).json({ token });
    }
  }
});

module.exports = router;
