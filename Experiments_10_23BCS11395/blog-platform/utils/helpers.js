const bcrypt = require("bcrypt");

function generateId(prefix = "id") {
  return prefix + "_" + Date.now().toString(36) + "_" + Math.random().toString(36).slice(2, 9);
}

async function hashPassword(p) {
  return await bcrypt.hash(p, 10);
}

async function comparePassword(p, h) {
  return await bcrypt.compare(p, h);
}

function errorHandler(err, req, res, next) {
  console.error(err);
  res.status(500).json({ error: "Server error" });
}

module.exports = { generateId, hashPassword, comparePassword, errorHandler };
