const { createOrder } = require("../data-access-layer/Orders");

async function order(UserId, cart) {
  const now = new Date();
  return createOrder(UserId, cart, now);
}

module.exports = { order };
