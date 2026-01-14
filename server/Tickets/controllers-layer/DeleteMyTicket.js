const express = require("express");
const router = express.Router();
const { handleError } = require("../../common/handleError");
const { currentUser } = require("../../common/currentUser");
const { deleteTicketFromDB } = require("../business-logic-layer/deleteTicket");

router.delete("/", currentUser, async (req, res) => {
  try {
    const { TicketId } = req.query;
    const UserId = req.currentUser.UserId;

    if (!UserId) {
      const error = new Error("Unauthorized: User is not authenticated");
      error.isClientError = true;
      error.statusCode = 401;
      throw error;
    }

    if (!TicketId) {
      const error = new Error("Bad Request: Missing required fields");
      error.isClientError = true;
      error.statusCode = 400;
      throw error;
    }

    const deleteTicket = await deleteTicketFromDB(UserId, TicketId);

    if (!deleteTicket._id) {
      const error = new Error("Ticket not found");
      error.isClientError = true;
      error.statusCode = 404;
      throw error;
    }

    res.status(200).send("OK");
  } catch (error) {
    handleError(error, res);
  }
});

module.exports = router;
