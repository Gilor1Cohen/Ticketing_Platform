const express = require("express");
const { LogInBL } = require("../business-logic-layer/login");
const { handleError } = require("../../common/handleError");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { Email, Password } = req.body;

    if (!Email || !Password) {
      const error = new Error("Missing required fields: Email, or Password");
      error.isClientError = true;
      error.statusCode = 422;
      throw error;
    }

    const login = await LogInBL(Email, Password);

    res.cookie("Auth", login.Token, { maxAge: 1800000, httpOnly: true });

    res.status(200).json({
      UserId: login.UserId,
    });
  } catch (error) {
    handleError(error, res);
  }
});

module.exports = router;
