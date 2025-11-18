const jwt = require("jsonwebtoken");
require("dotenv").config();

async function currentUser(req, res, next) {
  const token = req.cookies.Auth;

  if (!token) {
    req.currentUser = null;
    return next();
  }

  const payload = jwt.verify(token, process.env.JWT_SECRET);

  req.currentUser = payload;

  next();
}

module.exports = { currentUser };
