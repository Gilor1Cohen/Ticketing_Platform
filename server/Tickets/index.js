const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { connectTicketsDB } = require("./data-access-layer/config");
const { connectNats, getJsm, ensureStream } = require("./NATS/NATSconfig");
const { startListeners } = require("./NATS/EVENTS/startListeners");
const { expireOrdersJob } = require("./business-logic-layer/expireOrdersJob");
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

setInterval(() => {
  expireOrdersJob().catch((e) => console.error("[expireOrdersJob]", e));
}, 5 * 1000);

const streamName = "EVENTS_STREAM";

const durableName = "Tickets-Service-CONSUMER";

connectNats()
  .then(async () => {
    console.log("[APP] NATS connected");

    const jsm = getJsm();

    await ensureStream(jsm);

    startListeners(streamName, durableName).catch((err) => {
      console.error("[APP] listeners error:", err);
      process.exit(1);
    });

    app
      .listen(3002, () => console.log("Tickets listening on port 3002"))
      .on("error", (err) => {
        err.code === "EADDRINUSE"
          ? console.log("Error: Address in use")
          : console.log("Error: Unknown error");
      });
  })
  .catch((err) => {
    console.error("[APP] startup error:", err);
    process.exit(1);
  });
