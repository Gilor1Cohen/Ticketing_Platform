const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { connectTicketsDB } = require("./data-access-layer/config");
const app = express();
require("dotenv").config();

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(cookieParser());

connectTicketsDB();

app.use("/GetTickets", require("./controllers-layer/GetTickets"));

app.use("/AddTickets", require("./controllers-layer/AddTickets"));

app.use("/UpdateTickets", require("./controllers-layer/UpdateTickets"));

app.use("/GetMyTickets", require("./controllers-layer/GetMyTickets"));

app.use("/DeleteMyTicket", require("./controllers-layer/DeleteMyTicket"));

app
  .listen(3002, () => {
    console.log(`Tickets listening on port 3002`);
  })
  .on("error", (err) => {
    err.code === "EADDRINUSE"
      ? console.log("Error: Address in use")
      : console.log("Error: Unknown error");
  });
