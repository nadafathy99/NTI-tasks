const addUser = document.querySelector("#addUser");
const userProperties = ["name"];
const dataWrapper = document.querySelector("#dataWrapper");
const singleData = document.querySelector("#singleData");

const createMyOwnElement = (
  parent,
  ele,
  text = null,
  classes = null,
  attributes = null
) => {
  const myElement = document.createElement(ele);
  parent.appendChild(myElement);
  if (text) myElement.textContent = text;
  if (classes) myElement.classList = classes;
  if (attributes) {
    attributes.forEach((attr) => {
      myElement.setAttribute(attr.attrName, attr.attrVal);
    });
  }
  return myElement;
};

const delUser = (allUsers, index) => {
  allUsers.splice(index, 1);
  writeToStorage(allUsers);
  drawData(allUsers);
};
const singleUserDraw = (user, index, allUsers, mainParent) => {
  singleData.textContent = "";
  const tr = createMyOwnElement(mainParent, "tr");
  createMyOwnElement(tr, "td", index + 1);
  createMyOwnElement(tr, "td", user.accountID);
  userProperties.forEach((property) =>
    createMyOwnElement(tr, "td", user[property])
  );
  createMyOwnElement(tr, "td", user.balance);

  const transactionTd = createMyOwnElement(tr, "td");
  const viewTransactions = createMyOwnElement(
    transactionTd,
    "button",
    "View transactions",
    "btn btn-primary mx-2"
  );
  viewTransactions.addEventListener("click", (e) => {
    localStorage.setItem("user", JSON.stringify(user));
    window.location.href = "transactions.html";
  });
  const addTransactions = createMyOwnElement(
    transactionTd,
    "button",
    "Add transactions",
    "btn btn-primary mx-2"
  );
  addTransactions.addEventListener("click", (e) => {
    localStorage.setItem("index", index);
    window.location.href = "add-transaction.html";
  });
  const optionsTd = createMyOwnElement(tr, "td");
  const editBtn = createMyOwnElement(
    optionsTd,
    "button",
    "Edit",
    "btn btn-success mx-2"
  );
  editBtn.addEventListener("click", () => {
    localStorage.setItem("editID", index);
    window.location.href = "edit.html";
  });
  const delBtn = createMyOwnElement(
    optionsTd,
    "button",
    "delete",
    "btn btn-danger mx-2"
  );
  delBtn.addEventListener("click", (e) => delUser(allUsers, index));
};
const drawNoData = () => {
  const tr = createMyOwnElement(dataWrapper, "tr", null, "alert alert-danger");
  const attr = [{ attrName: "colspan", attrVal: 7 }];
  createMyOwnElement(tr, "td", "no users yet", null, attr);
};
const drawData = (allUsers) => {
  dataWrapper.innerHTML = "";
  if (allUsers.length == 0) drawNoData();
  else
    allUsers.forEach((user, index) =>
      singleUserDraw(user, index, allUsers, dataWrapper)
    );
};

if (addUser) {
  addUser.addEventListener("submit", function (e) {
    e.preventDefault();
    let user = { accountID: Date.now(), transactions: [], balance: 0 };
    userProperties.forEach(
      (property) => (user[property] = this.elements[property].value)
    );
    const allUsers = readFromStorage();
    allUsers.push(user);
    writeToStorage(allUsers);
    this.reset();
    window.location.href = "index.html";
  });
}

if (dataWrapper) {
  const allUsers = readFromStorage();
  drawData(allUsers);
}
const editUser = document.querySelector("#editUser");
if (editUser) {
  const index = localStorage.getItem("editID");
  if (!index) window.location.href = "index.html";
  const allUsers = readFromStorage();
  userProperties.forEach(
    (property) =>
      (editUser.elements[property].value = allUsers[index][property])
  );
  editUser.addEventListener("submit", (e) => {
    e.preventDefault();
    userProperties.forEach(
      (property) =>
        (allUsers[index][property] = editUser.elements[property].value)
    );
    writeToStorage(allUsers);
    localStorage.removeItem("editID");
    window.location.href = "index.html";
  });
}
