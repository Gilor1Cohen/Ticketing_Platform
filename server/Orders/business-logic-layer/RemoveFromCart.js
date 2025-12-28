const { remove } = require("../data-access-layer/Cart");

async function removeFromCart(UserId, TicketId) {
  return remove(UserId, TicketId);
}

module.exports = { removeFromCart };
