const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { connectOrdersDB } = require("./data-access-layer/config");
const app = express();
const { connectNats, ensureStream, getJsm } = require("./NATS/NATSconfig.js");
const { startListeners } = require("./NATS/EVENTS/startListeners.js");
require("dotenv").config();

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(cookieParser());

connectOrdersDB();

app.use("/Order", require("./controllers-layer/Order.js"));

app.use("/GetMyOrders", require("./controllers-layer/GetMyOrders.js"));

const streamName = "EVENTS_STREAM";

const durableName = "Orders-Service-CONSUMER";

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
      .listen(3003, () => {
        console.log("Orders listening on port 3003");
      })
      .on("error", (err) => {
        err.code === "EADDRINUSE"
          ? console.log("Error: Address in use")
          : console.log("Error: Unknown error", err);
      });
  })
  .catch((err) => {
    console.error("[APP] startup error:", err);
    process.exit(1);
  });
