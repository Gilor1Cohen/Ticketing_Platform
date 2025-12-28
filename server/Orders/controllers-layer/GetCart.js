const express = require("express");
const router = express.Router();
const { handleError } = require("../../common/handleError");
const { currentUser } = require("../../common/currentUser");
const { getCart } = require("../business-logic-layer/getCart");

router.get("/", currentUser, async (req, res) => {
  try {
    const UserId = req.currentUser.UserId;

    if (!UserId) {
      const error = new Error("Unauthorized: User is not authenticated");
      error.isClientError = true;
      error.statusCode = 401;
      throw error;
    }

    const cart = await getCart(UserId);

    res.status(200).send({ cart });
  } catch (error) {
    handleError(error, res);
  }
});

module.exports = router;
