const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { connectOrdersDB } = require("./data-access-layer/config");
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

connectOrdersDB();

app.use("/SaveCart", require("./controllers-layer/SaveCart.js"));

app.use("/GetCart", require("./controllers-layer/GetCart.js"));

app.use("/RemoveFromCart", require("./controllers-layer/RemoveFromCart.js"));

app.use("/Order", require("./controllers-layer/Order.js"));

app.use("/GetMyOrders", require("./controllers-layer/GetMyOrders.js"));

app
  .listen(3003, () => {
    console.log(`Orders listening on port 3003`);
  })
  .on("error", (err) => {
    err.code === "EADDRINUSE"
      ? console.log("Error: Address in use")
      : console.log("Error: Unknown error");
  });
