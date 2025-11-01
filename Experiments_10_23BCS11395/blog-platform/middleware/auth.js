const { verifyToken } = require("../config/jwt");

function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: "Authorization required" });

  const parts = authHeader.split(" ");
  if (parts.length !== 2 || parts[0] !== "Bearer")
    return res.status(401).json({ error: "Malformed token" });

  const token = parts[1];
  verifyToken(token, (err, payload) => {
    if (err) return res.status(403).json({ error: "Invalid or expired token" });
    req.user = payload;
    next();
  });
}

module.exports = { authenticate };
