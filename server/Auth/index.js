const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { connectAuthDB } = require("./data-access-layer/config");
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

app.use("/current-user", require("./controllers-layer/current-user"));

app
  .listen(3001, () => {
    console.log(`Auth listening on port 3001`);
  })
  .on("error", (err) => {
    err.code === "EADDRINUSE"
      ? console.log("Error: Address in use")
      : console.log("Error: Unknown error");
  });
