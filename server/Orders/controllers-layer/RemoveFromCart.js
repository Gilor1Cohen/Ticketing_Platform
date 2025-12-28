const express = require("express");
const router = express.Router();
const { handleError } = require("../../common/handleError");
const { currentUser } = require("../../common/currentUser");
const { removeFromCart } = require("../business-logic-layer/RemoveFromCart");

router.post("/", currentUser, async (req, res) => {
  try {
    const { TicketId } = req.body;

    const UserId = req.currentUser.UserId;

    if (!UserId) {
      const error = new Error("Unauthorized: User is not authenticated");
      error.isClientError = true;
      error.statusCode = 401;
      throw error;
    }
    const remove = await removeFromCart(UserId, TicketId);

    if (!remove._id) {
      const error = new Error("Failed to remove from cart");
      error.isClientError = false;
      error.statusCode = 500;
      throw error;
    }

    res.status(200).json({ Data: remove.Items });
  } catch (error) {
    handleError(error, res);
  }
});

module.exports = router;
