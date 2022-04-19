const yargs = require("yargs");
const {addUser} = require("./controllers/customer");
const {addTransaction} = require("./controllers/transaction");

yargs.command({
  command: "addUser",
  describe: "add user data",
  builder: {
    accountId: { default: Date.now() },
    transactions: { default: [] },
    balance: { default: 0 },
    name: { type: "string", demandOption: true },
  },
  handler: (argv) => addUser(argv),
});

yargs.command({
  command: "addTransaction",
  describe: "add transaction",
  builder: {
    searchVal: { type: "string", demandOption: true },
    transactionType: { type: "string", demandOption: true },
    transactionVal: { type: "number", demandOption: true },
  },
  handler: (argv) => addTransaction(argv),
});

yargs.argv;
