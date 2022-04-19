const deal = require("./dealWithJson");
const createUserObj = (data) => {
  return {
    id: data.accountId,
    balance: data.balance,
    transactions: data.transactions,
    name: data.name,
  };
};

const addUser = (data) => {
  try {
    const allUsers = deal.readDataFromJSON("users.json");
    let user = createUserObj(data);
    allUsers.push(user);
    deal.writeDataToJSON("users.json", allUsers);
  } catch (e) {
    console.log(e.message);
  }
};

module.exports = { addUser };
