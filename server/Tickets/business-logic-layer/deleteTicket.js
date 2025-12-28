const { deleteTicket } = require("../data-access-layer/delete");

async function deleteTicketFromDB(TicketId) {
  return deleteTicket(TicketId);
}

module.exports = { deleteTicketFromDB };
