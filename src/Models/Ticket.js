const mongoose = require("mongoose");

const TicketSchema = mongoose.Schema(
  {
    ticket: {
      type: Array,
      required: true,
    },
    user_id: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Ticket = mongoose.model("Ticket", TicketSchema);

module.exports = Ticket;
