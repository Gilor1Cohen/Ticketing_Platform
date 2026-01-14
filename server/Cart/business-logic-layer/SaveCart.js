const { saveCartToDB, cartById } = require("../data-access-layer/Cart");

const { publishEvent } = require("../NATS/EVENTS/Publisher/Publisher");

async function saveCart(UserId, _id, Price, Type, Date, Title) {
  const cart = await cartById(UserId);

  const isExists = cart.some((Item) => Item._id.toString() === _id.toString());

  if (isExists) {
    const error = new Error("Ticket already added to cart");
    error.isClientError = true;
    error.statusCode = 409;
    throw error;
  }
  const save = await saveCartToDB(UserId, _id, Price, Type, Date, Title);

  if (!save._id) {
    const error = new Error("Failed to save cart");
    error.isClientError = false;
    error.statusCode = 500;
    throw error;
  }

  const data = { TicketId: _id };

  await publishEvent("Cart.AddedToCart", data);

  return save;
}
module.exports = { saveCart };
