const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { connectAuthDB } = require("./data-access-layer/config");
const { connectNats, ensureStream, getJsm } = require("./NATS/NATSconfig.js");
const { startListeners } = require("./NATS/EVENTS/startListeners.js");
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

connectAuthDB();

app.use("/signup", require("./controllers-layer/signup"));

app.use("/signout", require("./controllers-layer/signout"));

app.use("/login", require("./controllers-layer/login"));

app.use("/DeleteProfile", require("./controllers-layer/DeleteProfile"));

app.use("/current-user", require("./controllers-layer/current-user"));

const streamName = "EVENTS_STREAM";

const durableName = "Auth-Service-CONSUMER";

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
      .listen(3001, () => {
        console.log(`Auth listening on port 3001`);
      })
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
