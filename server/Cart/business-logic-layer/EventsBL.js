const {
  removeAllCart,
  remove,
  saveCartToDB,
  removeTicketFromAnyCart,
} = require("../data-access-layer/Cart");

async function OrdersCreated(UserId) {
  try {
    return removeAllCart(UserId);
  } catch (error) {
    error.message = "Failed to remove from cart";
    error.isClientError = false;
    error.statusCode = 500;
    throw error;
  }
}

async function TicketsDelete(UserId, TicketId) {
  try {
    return remove(UserId, TicketId);
  } catch (error) {
    error.message = "Failed to remove from cart";
    error.isClientError = false;
    error.statusCode = 500;
    throw error;
  }
}

async function TicketsUpdated(UserId, TicketId, Title, Price, Date, Type) {
  try {
    await remove(UserId, TicketId);

    await saveCartToDB(UserId, TicketId, Price, Type, Date, Title);

    return "ok";
  } catch (error) {
    error.message = "Failed to remove from cart";
    error.isClientError = false;
    error.statusCode = 500;
    throw error;
  }
}

async function TicketReleased(TicketId) {
  try {
    await removeTicketFromAnyCart(TicketId);
    return;
  } catch (error) {}
}

async function DeleteProfile(UserId) {
  try {
    return removeAllCart(UserId);
  } catch (error) {
    error.message = "Failed to remove from cart";
    error.isClientError = false;
    error.statusCode = 500;
    throw error;
  }
}
module.exports = {
  OrdersCreated,
  TicketsDelete,
  TicketsUpdated,
  TicketReleased,
  DeleteProfile,
};
