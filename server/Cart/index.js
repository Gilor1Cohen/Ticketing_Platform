const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();
const { connectCartsDB } = require("./data-access-layer/config.js");
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

connectCartsDB();

app.use("/SaveCart", require("./controllers-layer/SaveCart.js"));

app.use("/GetCart", require("./controllers-layer/GetCart.js"));

app.use("/RemoveFromCart", require("./controllers-layer/RemoveFromCart.js"));

const streamName = "EVENTS_STREAM";

const durableName = "Cart-Service-CONSUMER";

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
      .listen(3004, () => {
        console.log("Cart listening on port 3004");
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
