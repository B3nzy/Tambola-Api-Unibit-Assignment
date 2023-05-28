const express = require("express");
const router = express.Router();
const ValidateUser = require("../Services/UserValidation");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const User = require("../Models/User");

router.post("/", async (req, res) => {
  const myPlaintextPassword = req.body.password;

  const validationResult = ValidateUser(req.body);

  if (validationResult.Error === null) {
    const hash = await bcrypt.hash(myPlaintextPassword, saltRounds);
    const user = new User({
      email: req.body.email,
      full_name: req.body.full_name,
      password: hash,
    });

    try {
      const userData = await user.save();
      console.log(userData);
      res.status(201).json("Success");
    } catch (err) {
      console.log(err);
      res.status(400).json({
        Error: err,
      });
    }
  } else {
    res.status(400).json(validationResult);
  }
});

module.exports = router;
