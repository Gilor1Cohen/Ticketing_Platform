const CartSchema = require("./Cart.schema");

async function saveCartToDB(UserId, _id, Price, Type, Date, Title) {
  try {
    const add = await CartSchema.findOneAndUpdate(
      { UserId },
      {
        $setOnInsert: { UserId },
        $addToSet: { Items: { _id, Price, Type, Date, Title } },
      },
      {
        upsert: true,
        new: true,
        runValidators: true,
      }
    );

    return add;
  } catch (error) {
    error.message = "Failed to save cart";
    error.isClientError = false;
    error.statusCode = 500;
    throw error;
  }
}

async function cartById(userId) {
  try {
    const cart = await CartSchema.find({ UserId: userId });

    return cart.length > 0 ? cart[0].Items : [];
  } catch (error) {
    error.message = "Failed to get the cart";
    error.isClientError = false;
    error.statusCode = 500;
    throw error;
  }
}

async function remove(UserId, _id) {
  try {
    const cart = await cartById(UserId);

    if (!cart) return null;

    if (cart.length <= 1) {
      const deletedCart = await CartSchema.findOneAndDelete({ UserId });

      return deletedCart;
    }

    const updatedCart = await CartSchema.findOneAndUpdate(
      { UserId },
      { $pull: { Items: { _id } } },
      { new: true }
    );

    return updatedCart;
  } catch (error) {
    error.message = "Failed to remove from cart";
    error.isClientError = false;
    error.statusCode = 500;
    throw error;
  }
}

module.exports = { saveCartToDB, cartById, remove };
