const TicketSchema = require("./Ticket.schema");

async function deleteTicket(TicketId) {
  try {
    const deleteTicket = await TicketSchema.findByIdAndDelete(TicketId);
    if (!deleteTicket._id) {
      const error = new Error("Ticket not found");
      error.isClientError = true;
      error.statusCode = 404;
      throw error;
    }

    return deleteTicket;
  } catch (error) {
    error.message = "Error updating ticket: " + error.message;
    error.isClientError = true;
    error.statusCode = 400;
    throw error;
  }
}

module.exports = { deleteTicket };
