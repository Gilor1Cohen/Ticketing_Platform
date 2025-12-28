const OrdersSchema = require("./Order.schema");

async function createOrder(UserId, cart, now) {
  try {
    const create = await OrdersSchema.create({
      UserId,
      Items: cart,
      CreatedAt: now,
    });

    if (!create) {
      const error = new Error("Failed to create order");
      error.isClientError = true;
      error.statusCode = 500;
      throw error;
    }

    return create._id.toString();
  } catch (error) {}
  error.message = "Database Error: Unable to create order";
  error.isClientError = false;
  error.statusCode = 500;
  throw error;
}

async function userOrders(UserId) {
  try {
    const orders = await OrdersSchema.find(
      { UserId },
      { _id: 0, UserId: 0, __v: 0 }
    ).sort({
      CreatedAt: -1,
    });

    return orders;
  } catch (error) {
    error.message = "Database Error: Unable to fetch user orders";
    error.isClientError = false;
    error.statusCode = 500;
    throw error;
  }
}

module.exports = { createOrder, userOrders };
