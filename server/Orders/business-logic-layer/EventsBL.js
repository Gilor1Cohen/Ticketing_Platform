const { deleteUserOrders } = require("../data-access-layer/Orders");

async function DeleteProfile(UserId) {
  try {
    return deleteUserOrders(UserId);
  } catch (error) {
    error.message = "Database Error: Unable to delete user orders";
    error.isClientError = false;
    error.statusCode = 500;
    throw error;
  }
}

module.exports = { DeleteProfile };
