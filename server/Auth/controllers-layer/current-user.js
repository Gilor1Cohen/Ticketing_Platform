const express = require("express");
const router = express.Router();
const { handleError } = require("../../common/handleError");
const { currentUser } = require("../../common/currentUser");

router.get("/", currentUser, async (req, res) => {
  try {
    if (req.currentUser === null) {
      const error = new Error("No authenticated user");
      error.isClientError = true;
      error.statusCode = 401;
      throw error;
    }

    res.status(200).send({ currentUser: req.currentUser });
  } catch (error) {
    handleError(error, res);
  }
});

module.exports = router;
