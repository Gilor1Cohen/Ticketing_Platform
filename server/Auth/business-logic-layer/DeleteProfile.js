const { DeleteUserFormDB } = require("../data-access-layer/Auth-DAL");
const { publishEvent } = require("../NATS/EVENTS/Publisher/Publisher");

async function DeleteProfile(UserId) {
  try {
    const deleted = await DeleteUserFormDB(UserId);

    if (!deleted) {
      const err = new Error("User not found");
      err.isClientError = true;
      err.statusCode = 404;
      throw err;
    }

    const data = { UserId };

    await publishEvent("Auth.DeleteProfile", data);

    return deleted;
  } catch (error) {
    error.message = "Failed to delete user";
    error.isClientError = false;
    error.statusCode = 500;
    throw error;
  }
}

module.exports = { DeleteProfile };
