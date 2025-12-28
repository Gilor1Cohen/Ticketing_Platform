const { userOrders } = require("../data-access-layer/Orders");

async function getUserOrders(UserId) {
  return userOrders(UserId);
}

module.exports = { getUserOrders };
