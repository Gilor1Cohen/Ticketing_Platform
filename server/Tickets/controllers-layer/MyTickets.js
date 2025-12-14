const express = require("express");
const router = express.Router();
const { handleError } = require("../../common/handleError");
const { currentUser } = require("../../common/currentUser");

router.get("/", currentUser, async (req, res) => {
  try {
    const UserId = req.currentUser.UserId;

    if (!UserId) {
      const error = new Error("Unauthorized: User is not authenticated");
      error.isClientError = true;
      error.statusCode = 401;
      throw error;
    }

    const data = await MyTickets(UserId);

    res.status(200).json(data);
  } catch (error) {
    handleError(error, res);
  }
});

module.exports = router;
