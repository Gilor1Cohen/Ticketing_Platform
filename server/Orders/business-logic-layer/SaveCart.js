const { saveCartToDB, cartById } = require("../data-access-layer/Cart");

async function saveCart(UserId, _id, Price, Type, Date, Title) {
  const cart = await cartById(UserId);

  const isExists = cart.some((Item) => Item._id.toString() === _id.toString());

  if (isExists) {
    const error = new Error("Ticket already added to cart");
    error.isClientError = true;
    error.statusCode = 409;
    throw error;
  }
  return saveCartToDB(UserId, _id, Price, Type, Date, Title);
}
module.exports = { saveCart };
