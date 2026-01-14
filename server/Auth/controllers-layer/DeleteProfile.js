const express = require("express");
const router = express.Router();
const { handleError } = require("../../common/handleError");
const { currentUser } = require("../../common/currentUser");

const { DeleteProfile } = require("../business-logic-layer/DeleteProfile");

router.post("/", currentUser, async (req, res) => {
  try {
    const UserId = req.currentUser?.UserId;

    if (!UserId) {
      const error = new Error("Unauthorized: User is not authenticated");
      error.isClientError = true;
      error.statusCode = 401;
      throw error;
    }

    const DeleteProfileOnDB = await DeleteProfile(UserId);

    if (!DeleteProfileOnDB) {
      const err = new Error("User not found");
      err.isClientError = true;
      err.statusCode = 404;
      throw err;
    }

    res.clearCookie("Auth", { httpOnly: true });
    return res.status(200).json({ message: "Successfully Delete." });
  } catch (error) {
    handleError(error, res);
  }
});

module.exports = router;
