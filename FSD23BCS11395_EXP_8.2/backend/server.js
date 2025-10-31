import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// Login → issues JWT
app.post("/login", (req, res) => {
  const token = jwt.sign(
    { email: "test@gmail.com" },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  res.json({ token });
});

// Middleware to verify token
function verifyToken(req, res, next) {
  const bearer = req.headers.authorization;
  if (!bearer) return res.json({ message: "Token Missing ❌" });

  try {
    jwt.verify(bearer.split(" ")[1], process.env.JWT_SECRET);
    next();
  } catch {
    return res.json({ message: "Invalid Token ❌" });
  }
}

// Protected Route
app.get("/secret", verifyToken, (req, res) => {
  res.json({ message: "Protected Route Accessed ✅" });
});

app.listen(5001, () => console.log("Backend running on 5001"));
