const express = require("express");
const router = express.Router();
const { handleError } = require("../../common/handleError");
const { currentUser } = require("../../common/currentUser");
const { addTicket } = require("../business-logic-layer/AddTicket");

router.post("/", currentUser, async (req, res) => {
  try {
    const { Title, Price, Date, Type } = req.body;
    const UserId = req.currentUser.UserId;

    if (!UserId) {
      const error = new Error("Unauthorized: User is not authenticated");
      error.isClientError = true;
      error.statusCode = 401;
      throw error;
    }

    if (!Title || !Price || !Date || !Type) {
      const error = new Error("Bad Request: Missing required fields");
      error.isClientError = true;
      error.statusCode = 400;
      throw error;
    }

    const add = await addTicket(Title, Price, Date, Type, UserId);

    if (add?.success !== true) {
      const error = new Error("Internal Server Error: Could not add ticket");
      error.isClientError = false;
      error.statusCode = 500;
      throw error;
    }

    res.status(200).json({ message: "Ticket added" });
  } catch (error) {
    handleError(error, res);
  }
});

module.exports = router;
