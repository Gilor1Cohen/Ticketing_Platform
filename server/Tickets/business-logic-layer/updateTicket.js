const { findAndUpdateTicket } = require("../data-access-layer/putData");

async function updateTicket(_id, Title, Price, Date, Type) {
  return findAndUpdateTicket(_id, Title, Price, Date, Type);
}

module.exports = { updateTicket };
