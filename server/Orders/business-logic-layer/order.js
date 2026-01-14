const { createOrder } = require("../data-access-layer/Orders");
const { publishEvent } = require("../NATS/EVENTS/Publisher/Publisher");

async function order(UserId, cart) {
  const now = new Date();

  const data = { ids: cart.map((item) => item._id), UserId };

  try {
    const create = await createOrder(UserId, cart, now);

    if (!create) {
      error.message = "Failed to create order";
      error.isClientError = false;
      error.statusCode = 500;
      throw error;
    }

    await publishEvent("Orders.Created", data);

    return create;
  } catch (error) {
    error.message = "Failed to create order";
    error.isClientError = false;
    error.statusCode = 500;
    throw error;
  }
}

module.exports = { order };
