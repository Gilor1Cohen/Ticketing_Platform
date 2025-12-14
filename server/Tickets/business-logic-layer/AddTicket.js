const { postTicket } = require("../data-access-layer/PostData");

async function addTicket(Title, Price, Date, Type, UserId) {
  return await postTicket(Title, Price, Date, Type, UserId);
}

module.exports = { addTicket };
