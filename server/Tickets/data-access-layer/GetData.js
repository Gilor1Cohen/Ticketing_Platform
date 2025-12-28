const TicketSchema = require("./Ticket.schema");

async function TicketsData(page, category) {
  try {
    const data = await TicketSchema.find(
      category === "All" ? {} : { Type: category },
      { Title: 1, Price: 1, Type: 1, Date: 1 }
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

async function userTickets(UserId) {
  try {
    const data = await TicketSchema.find(
      { UserId: UserId },
      { UserId: 0, __v: 0 }
    );
    return data;
  } catch (error) {
    error.message = "Failed to get user tickets";
    error.isClientError = false;
    error.statusCode = 500;
    throw error;
  }
}

module.exports = { TicketsData, CountTickets, userTickets };
