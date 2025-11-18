const express = require("express");
const router = express.Router();
const { handleError } = require("../../common/handleError");

router.post("/", async (req, res) => {
  try {
    const TokenCookie = req.cookies.Auth;

    if (!TokenCookie) {
      return res
        .status(400)
        .json({ message: "Successfully signed out anyway!" });
    }

    res.clearCookie("Auth", { httpOnly: true });
    return res.status(200).json({ message: "Successfully signed out." });
  } catch (error) {
    handleError(error, res);
  }
});

module.exports = router;
