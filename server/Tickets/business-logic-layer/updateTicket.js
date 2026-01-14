const { findAndUpdateTicket } = require("../data-access-layer/putData");
const { publishEvent } = require("../NATS/EVENTS/Publisher/Publisher");

async function updateTicket(_id, Title, Price, Date, Type, UserId) {
  try {
    const update = await findAndUpdateTicket(_id, Title, Price, Date, Type);

    if (!update) {
      error.message = "Failed to update ticket";
      error.isClientError = false;
      error.statusCode = 500;
      throw error;
    }

    const data = { UserId, TicketId: _id, Title, Price, Date, Type };

    await publishEvent("Tickets.Updated", data);

    return update;
  } catch (error) {
    error.message = "Failed to update ticket";
    error.isClientError = false;
    error.statusCode = 500;
    throw error;
  }
}

module.exports = { updateTicket };
