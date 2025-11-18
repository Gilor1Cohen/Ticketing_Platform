const express = require("express");

const { SignUpBL } = require("../business-logic-layer/signup");
const { handleError } = require("../../common/handleError");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { Email, Password, UserName } = req.body;

    if (!UserName || !Email || !Password) {
      const error = new Error(
        "Missing required fields: UserName, Email, or Password"
      );
      error.isClientError = true;
      error.statusCode = 422;
      throw error;
    }

    const signup = await SignUpBL(UserName, Email, Password);

    res.cookie("Auth", signup.Token, { maxAge: 1800000, httpOnly: true });

    res.status(200).json({
      UserId: signup.UserId,
    });
  } catch (error) {
    handleError(error, res);
  }
});

module.exports = router;
