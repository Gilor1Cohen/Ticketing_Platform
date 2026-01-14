const {
  deleteTicket,
  DeleteProfileFromDB,
} = require("../data-access-layer/delete");
const { ChangeAvailable } = require("../data-access-layer/putData");

async function OrdersCreated(ids) {
  try {
    for (let i of ids) {
      try {
        await deleteTicket(i);
      } catch (error) {
        error.message = "Error updating ticket";
        error.isClientError = true;
        error.statusCode = 400;
        throw error;
      }
    }

    return "ok";
  } catch (error) {
    error.message = "Error updating ticket";
    error.isClientError = true;
    error.statusCode = 400;
    throw error;
  }
}

async function AddedToCart(TicketId) {
  try {
    const Available = false;

    const LockedIn = new Date(Date.now() + 15 * 60 * 1000);

    await ChangeAvailable(TicketId, Available, LockedIn);

    return;
  } catch (error) {
    error.message = "Error updating ticket";
    error.isClientError = true;
    error.statusCode = 400;
    throw error;
  }
}

async function RemoveFromCart(TicketId) {
  try {
    const Available = true;

    const LockedIn = null;

    await ChangeAvailable(TicketId, Available, LockedIn);

    return;
  } catch (error) {
    error.message = "Error updating ticket";
    error.isClientError = true;
    error.statusCode = 400;
    throw error;
  }
}

async function DeleteProfile(UserId) {
  try {
    return DeleteProfileFromDB(UserId);
  } catch (error) {}
}

module.exports = { OrdersCreated, AddedToCart, RemoveFromCart, DeleteProfile };
