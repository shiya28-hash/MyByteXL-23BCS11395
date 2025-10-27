// Account Transfer System with Balance Validation in Node.js

const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

// ------------------ In-Memory Database ------------------
let accounts = [
  { id: 1, name: "Somraj", balance: 10000 },
  { id: 2, name: "Rahul", balance: 5000 },
  { id: 3, name: "Aisha", balance: 7000 }
];

// Utility functions
function getAccount(id) {
  return accounts.find(acc => acc.id === id);
}

function updateBalance(id, newBalance) {
  const account = getAccount(id);
  if (account) account.balance = newBalance;
}

// ------------------ Routes ------------------

// Get all accounts
app.get("/accounts", (req, res) => {
  res.json(accounts);
});

// Transfer funds between accounts
app.post("/transfer", (req, res) => {
  const { fromId, toId, amount } = req.body;

  // Validation
  const fromAcc = getAccount(fromId);
  const toAcc = getAccount(toId);

  if (!fromAcc || !toAcc) {
    return res.status(400).json({ error: "Invalid account ID(s)" });
  }

  if (amount <= 0) {
    return res.status(400).json({ error: "Transfer amount must be positive" });
  }

  if (fromAcc.balance < amount) {
    return res.status(400).json({ error: "Insufficient balance" });
  }

  // Perform transfer
  updateBalance(fromId, fromAcc.balance - amount);
  updateBalance(toId, toAcc.balance + amount);

  res.json({
    message: "✅ Transfer successful",
    from: { name: fromAcc.name, newBalance: fromAcc.balance },
    to: { name: toAcc.name, newBalance: toAcc.balance }
  });
});

// ------------------ Start Server ------------------
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Account Transfer System running on port ${PORT}`);
});
