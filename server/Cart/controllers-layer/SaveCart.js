const express = require("express");
const router = express.Router();
const { handleError } = require("../../common/handleError");
const { saveCart } = require("../business-logic-layer/SaveCart");
const { currentUser } = require("../../common/currentUser");

router.post("/", currentUser, async (req, res) => {
  try {
    const {
      Ticket: { _id, Price, Type, Date, Title },
    } = req.body;
    const UserId = req.currentUser.UserId;

    if (!UserId) {
      const error = new Error("Unauthorized: User is not authenticated");
      error.isClientError = true;
      error.statusCode = 401;
      throw error;
    }
    const save = await saveCart(UserId, _id, Price, Type, Date, Title);

    if (!save._id) {
      const error = new Error("Failed to save cart");
      error.isClientError = false;
      error.statusCode = 500;
      throw error;
    }

    res.status(200).json({ Data: save.Items });
  } catch (error) {
    handleError(error, res);
  }
});

module.exports = router;
