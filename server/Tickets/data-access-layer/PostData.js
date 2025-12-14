const TicketSchema = require("./Ticket.schema");

async function postTicket(Title, Price, Date, Type, UserId) {
  try {
    const addedTicket = await TicketSchema.create({
      Price,
      Type,
      UserId,
      OrderId: null,
      Date,
      Title,
    });

    if (!addedTicket._id) {
      const error = new Error("Error adding ticket to the database");
      error.isClientError = true;
      error.statusCode = 400;
      throw error;
    }

    return { success: true, ticketId: addedTicket._id };
  } catch (error) {
    error.isClientError = true;
    error.statusCode = 400;
    error.message = "Error adding ticket to the database";
    throw error;
  }
}

module.exports = { postTicket };
