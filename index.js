require("dotenv").config();
const bodyParser = require("body-parser");
const express = require("express");
const mongoose = require("mongoose");
const PORT = 8000 || process.env.PORT;

const server = express();

server.use(bodyParser.json());

mongoose.connect(`${process.env.MONGO_CONNECTION_STRING}`).then(() => {
  console.log("Connected to the mongoDB Database");
});

// Authentication Routes
const signUpRoute = require("./src/Routes/SignUp");
server.use("/signup", signUpRoute);

const loginRoute = require("./src/Routes/Login");
server.use("/login", loginRoute);

const CreateTambolaTicket = require("./src/Routes/CreateTambolaTicket");
server.use("/createticket", CreateTambolaTicket);

const GetTambolaTicket = require("./src/Routes/GetTambolaTicket");
server.use("/gettickets", GetTambolaTicket);

server.listen(PORT, (req, res) => {
  console.log(`Server is running on port ${PORT}`);
});
