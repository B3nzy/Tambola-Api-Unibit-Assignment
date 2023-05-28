const express = require("express");
const router = express.Router();
const VerifyJWTToken = require("../Services/TokenVerification");
const TambolaTicketGeneration = require("../Services/TambolaTicketGeneration");
const Ticket = require("../Models/Ticket");
const jwt = require("jsonwebtoken");

router.post("/", async (req, res) => {
  const noOfTickets = req.body.no_of_tickets;
  const token = req.header("auth_token");
  if (VerifyJWTToken(token)) {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN);
    let ticketsArray = [];
    for (let i = 0; i < noOfTickets; i++) {
      let tambolaTicket = 0;
      while (tambolaTicket === 0) {
        tambolaTicket = TambolaTicketGeneration();
      }
      const ticket = new Ticket({
        ticket: tambolaTicket,
        user_id: decoded.id,
      });
      try {
        const ticketData = await ticket.save();
        ticketsArray.push(ticketData._id);
      } catch (err) {
        console.log(err);
      }
    }

    res.status(200).json({
      tickets: ticketsArray,
    });
  } else {
    res.status(401).json({
      Error: "Token verification failed.",
    });
  }
});

module.exports = router;
