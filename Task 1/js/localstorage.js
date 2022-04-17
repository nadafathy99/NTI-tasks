// read from storage
let readFromStorage = (storageKey = "users") => {
  let data;
  try {
    data = JSON.parse(localStorage.getItem(storageKey)) || [];
    if (!Array.isArray(data)) throw new Error("not an array");
  } catch (err) {
    data = [];
  }
  return data;
};
// write to storage
let writeToStorage = (data = [], storageKey = "users") => {
  localStorage.setItem(storageKey, JSON.stringify(data));
};
