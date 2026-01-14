const {
  unavailable,
  releaseTicketById,
} = require("../data-access-layer/GetData");

const { publishEvent } = require("../NATS/EVENTS/Publisher/Publisher");

async function expireOrdersJob() {
  try {
    const allTickets = await unavailable();

    for (const t of allTickets) {
      await releaseTicketById(t._id.toString());

      const data = { TicketId: t._id };

      console.log(data);

      await publishEvent("Tickets.TicketReleased", data);
    }

    return;
  } catch (error) {
    error.message = "Error expiring tickets";
    error.isClientError = false;
    error.statusCode = 500;
    throw error;
  }
}

module.exports = { expireOrdersJob };
