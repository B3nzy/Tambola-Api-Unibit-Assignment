const express = require("express");
const router = express.Router();
const VerifyJWTToken = require("../Services/TokenVerification");
const Ticket = require("../Models/Ticket");
const jwt = require("jsonwebtoken");

router.get("/", async (req, res) => {
  const token = req.header("auth_token");
  const page = req.header("page");
  const limit = req.header("limit");
  if (VerifyJWTToken(token)) {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN);

    const ticketData = await Ticket.find({ user_id: decoded.id })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    let tickets = [];
    for (let i = 0; i < ticketData.length; i++) {
      tickets.push(ticketData[i].ticket);
    }

    console.log(ticketData);
    res.status(200).json({
      tickets: tickets,
      currentPage: page,
    });
  } else {
    res.status(401).json({
      Error: "Token verification failed.",
    });
  }
});

module.exports = router;
