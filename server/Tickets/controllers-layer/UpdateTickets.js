const express = require("express");
const router = express.Router();
const { handleError } = require("../../common/handleError");
const { currentUser } = require("../../common/currentUser");
const { updateTicket } = require("../business-logic-layer/updateTicket");

router.put("/", currentUser, async (req, res) => {
  try {
    const UserId = req.currentUser.UserId;
    const { Title, Price, Date, Type, _id } = req.body;

    if (!UserId) {
      const error = new Error("Unauthorized: User is not authenticated");
      error.isClientError = true;
      error.statusCode = 401;
      throw error;
    }

    if (!Title || !Price || !Date || !Type || !_id) {
      const error = new Error("Bad Request: Missing required fields");
      error.isClientError = true;
      error.statusCode = 400;
      throw error;
    }

    const update = await updateTicket(_id, Title, Price, Date, Type, UserId);

    if (!update._id) {
      const error = new Error("Ticket update failed");
      error.isClientError = true;
      error.statusCode = 500;
      throw error;
    }

    res.status(200).json({
      _id,
      Price,
      Type,
      Date,
      Title,
    });
  } catch (error) {
    handleError(error, res);
  }
});

module.exports = router;
