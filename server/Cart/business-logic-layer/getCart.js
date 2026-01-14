const { cartById } = require("../data-access-layer/Cart");

async function getCart(UserId) {
  return cartById(UserId);
}

module.exports = { getCart };
