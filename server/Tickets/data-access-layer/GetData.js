const TicketSchema = require("./Ticket.schema");

async function TicketsData(page, category) {
  try {
    const data = await TicketSchema.find(
      category === "All" ? {} : { Type: category }
    )
      .skip((page - 1) * 6)
      .limit(6);

    if (data.length === 0 || !data) {
      const error = new Error("No Tickets found");
      error.isClientError = true;
      error.statusCode = 404;
      throw error;
    }

    return data;
  } catch (error) {
    throw error;
  }
}

async function CountTickets(category) {
  try {
    const totalTickets = await TicketSchema.countDocuments(
      category === "All" ? {} : { Type: category }
    );

    return totalTickets;
  } catch (error) {
    throw error;
  }
}

module.exports = { TicketsData, CountTickets };
