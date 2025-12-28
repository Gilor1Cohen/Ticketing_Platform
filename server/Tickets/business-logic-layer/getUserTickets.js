const { userTickets } = require("../data-access-layer/GetData");

async function getUserTickets(UserId) {
  return userTickets(UserId);
}
module.exports = { getUserTickets };
