const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";

function generateToken(user) {
  return jwt.sign(
    { id: user.id, username: user.username },
    JWT_SECRET,
    { expiresIn: "6h" }
  );
}

function verifyToken(token, callback) {
  jwt.verify(token, JWT_SECRET, callback);
}

module.exports = { generateToken, verifyToken };
