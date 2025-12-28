const express = require("express");
const router = express.Router();
const { handleError } = require("../../common/handleError");
const { currentUser } = require("../../common/currentUser");
const { order } = require("../business-logic-layer/order");

router.post("/", currentUser, async (req, res) => {
  try {
    const { cart } = req.body.Cart;

    const UserId = req.currentUser.UserId;

    if (!UserId) {
      const error = new Error("Unauthorized: User is not authenticated");
      error.isClientError = true;
      error.statusCode = 401;
      throw error;
    }

    const orderUser = await order(UserId, cart);

    if (typeof orderUser !== "string") {
      const error = new Error("Order processing failed");
      error.isClientError = true;
      error.statusCode = 400;
      throw error;
    }

    res.status(200).json("Order processed successfully");
  } catch (error) {
    handleError(error, res);
  }
});

module.exports = router;
