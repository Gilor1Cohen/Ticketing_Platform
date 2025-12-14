const { TicketsData, CountTickets } = require("../data-access-layer/GetData");

async function GetTickets(page, category) {
  try {
    const data = await TicketsData(page, category);

    const numberOfTickets = await CountTickets(category);

    if (data.length === 0 || numberOfTickets === 0) {
      const error = new Error("No Tickets found");
      error.isClientError = true;
      error.statusCode = 404;
      throw error;
    }

    return { data, numberOfPages: Math.ceil(numberOfTickets / 6) };
  } catch (error) {}
}

module.exports = { GetTickets };
