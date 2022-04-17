const addTransaction = document.querySelector("#addTransaction");
const viewTransactions = document.querySelector("#viewTransactions");
const transacationProperties = ["Ttype", "Tvalue"];

if (addTransaction) {
  const index = JSON.parse(localStorage.getItem("index"));
  if (typeof index != "number") window.location.href = "index.html";
  const allUsers = readFromStorage();
  addTransaction.addEventListener("submit", (e) => {
    e.preventDefault();
    const transactionVal = parseInt(addTransaction.elements["Tvalue"].value);
    const transationType = addTransaction.elements["Ttype"].value;
    let transation = {};
    transacationProperties.forEach(
      (property) =>
        (transation[property] = addTransaction.elements[property].value)
    );

    if (transationType === "Withdraw") {
      validBalance = checkBalance({
        index,
        value: transactionVal,
        allUsers,
      });
      if (!validBalance) {
        return alert("cannot commit this transaction");
      }
    }

    calcBalance({
      index,
      value: transactionVal,
      allUsers,
      type: transationType,
    });
    allUsers[index]["transactions"].push(transation);
    writeToStorage(allUsers);
    localStorage.removeItem("index");
    window.location.href = "index.html";
  });
}

const drawNoTransactions = () => {
  const tr = createMyOwnElement(
    viewTransactions,
    "tr",
    null,
    "alert alert-danger"
  );
  const attr = [{ attrName: "colspan", attrVal: 7 }];
  createMyOwnElement(tr, "td", "no transactions yet", null, attr);
};

if (viewTransactions) {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user.transactions.length === 0) drawNoTransactions();
  user.transactions.forEach((transaction, i) => {
    const tr = createMyOwnElement(viewTransactions, "tr");
    const index = createMyOwnElement(tr, "td", i + 1);
    const type = createMyOwnElement(tr, "td", transaction.Ttype);
    const value = createMyOwnElement(tr, "td", transaction.Tvalue);
  });
  localStorage.removeItem("user");
}

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
