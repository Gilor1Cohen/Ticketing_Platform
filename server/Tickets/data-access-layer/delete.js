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
    error.message = "Error delete ticket";
    error.isClientError = true;
    error.statusCode = 400;
    throw error;
  }
}

async function DeleteProfileFromDB(UserId) {
  try {
    const deleteTicket = await TicketSchema.deleteMany({ UserId: UserId });

    return deleteTicket;
  } catch (error) {
    error.message = "Error delete tickets";
    error.isClientError = true;
    error.statusCode = 400;
    throw error;
  }
}

module.exports = { deleteTicket, DeleteProfileFromDB };
