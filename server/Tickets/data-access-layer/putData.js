const TicketSchema = require("./Ticket.schema");

async function findAndUpdateTicket(_id, Title, Price, Date, Type) {
  try {
    const updatedTicket = await TicketSchema.findByIdAndUpdate(
      { _id },
      { Title, Price, Date, Type },
      { new: true }
    );
    if (!updatedTicket._id) {
      const error = new Error("Ticket not found");
      error.isClientError = true;
      error.statusCode = 404;
      throw error;
    }

    return updatedTicket;
  } catch (error) {
    error.message = "Error updating ticket: " + error.message;
    error.isClientError = true;
    error.statusCode = 404;
    throw error;
  }
}

module.exports = { findAndUpdateTicket };
