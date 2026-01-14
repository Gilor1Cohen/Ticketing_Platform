const { deleteTicket } = require("../data-access-layer/delete");
const { publishEvent } = require("../NATS/EVENTS/Publisher/Publisher");

async function deleteTicketFromDB(UserId, TicketId) {
  try {
    const deleteTicketDal = await deleteTicket(TicketId);

    if (!deleteTicketDal) {
      error.message = "Failed to delete ticket";
      error.isClientError = false;
      error.statusCode = 500;
      throw error;
    }

    const data = { UserId, TicketId };

    await publishEvent("Tickets.Delete", data);

    return deleteTicketDal;
  } catch (error) {
    error.message = "Failed to delete ticket";
    error.isClientError = false;
    error.statusCode = 500;
    throw error;
  }
}

module.exports = { deleteTicketFromDB };
