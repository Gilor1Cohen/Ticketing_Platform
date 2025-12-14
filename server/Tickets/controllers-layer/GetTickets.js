const express = require("express");
const router = express.Router();
const { handleError } = require("../../common/handleError");
const { GetTickets } = require("../business-logic-layer/GetTickets");

router.get("/", async (req, res) => {
  try {
    const { page, category } = req.query;

    if ((!page, !category)) {
      const error = new Error(
        "Page or Category query parameter is not provided"
      );
      error.isClientError = true;
      error.statusCode = 400;
      throw error;
    }

    const tickets = await GetTickets(page, category);

    res.status(200).json(tickets);
  } catch (error) {
    handleError(error, res);
  }
});

module.exports = router;
