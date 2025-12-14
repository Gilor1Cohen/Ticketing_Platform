const express = require("express");
const router = express.Router();
const { handleError } = require("../../common/handleError");

router.put("/:id", async (req, res) => {
  try {
  } catch (error) {
    handleError(error, res);
  }
});

module.exports = router;
