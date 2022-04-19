const deal = require("./dealWithJson");
const allUsers = deal.readDataFromJSON("users.json");

const printUserObj = (user) => {
  console.log(
    `id: ${user.accountId} - name:${user.name}- balance:${user.balance} - transactions:${user.transactions}`
  );
};
const searchInUsers = (allUsers, searchVal, searchKey = "accountId") =>
  allUsers.findIndex((user) => user[searchKey] == searchVal);

const addTransaction = (data) => {
  const userIndex = searchInUsers(allUsers, data.searchVal);
  if (userIndex === -1) throw new Error("user not found");
  if (data.transactionType === "Withdraw") {
    validBalance = checkBalance({
      index: userIndex,
      value: data.transactionVal,
      allUsers: allUsers,
    });
    if (!validBalance) throw new Error("cannot commit this transaction");
  }
  calcBalance({
    index: userIndex,
    value: data.transactionVal,
    allUsers: allUsers,
    type: data.transactionType,
  });

  allUsers[userIndex]["transactions"].push({
    transactionType: data.transactionType,
    transactionVal: data.transactionVal,
  });
  console.log(allUsers[userIndex]["transactions"]);
  console.log(data.transactionVal);

  deal.writeDataToJSON("users.json", allUsers);
  printUserObj(allUsers[userIndex]);
};

const checkBalance = ({ index, allUsers, value }) => {
  return allUsers[index].balance >= value ? true : false;
};

const calcBalance = ({ index, allUsers, type, value }) => {
  switch (type) {
    case "Add":
      allUsers[index].balance += value;
      break;
    case "Withdraw":
      console.log(value);
      allUsers[index].balance -= value;
      break;
  }
};

module.exports = { addTransaction };
