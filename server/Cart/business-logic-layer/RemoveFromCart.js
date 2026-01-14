const { remove } = require("../data-access-layer/Cart");
const { publishEvent } = require("../NATS/EVENTS/Publisher/Publisher");

async function removeFromCart(UserId, TicketId) {
  try {
    const removeTicketFromCart = await remove(UserId, TicketId);

    const data = { TicketId: TicketId };

    await publishEvent("Cart.RemoveFromCart", data);

    return removeTicketFromCart;
  } catch (error) {
    console.log(error);
  }
}

module.exports = { removeFromCart };
