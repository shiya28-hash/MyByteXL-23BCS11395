import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// Dummy roles
const users = {
  admin: "admin",
  moderator: "moderator",
  user: "user"
};

// Login Request
app.post("/login", (req, res) => {
  const { role } = req.body;

  if (!users[role]) return res.json({ message: "Invalid Role ❌" });

  const token = jwt.sign({ role }, process.env.JWT_SECRET);

  res.json({ token });
});

// Role Middleware
function verifyRole(allowed) {
  return (req, res, next) => {
    const bearer = req.headers.authorization;
    if (!bearer) return res.json({ message: "Token Missing ❌" });

    try {
      const data = jwt.verify(bearer.split(" ")[1], process.env.JWT_SECRET);

      if (allowed.includes(data.role)) {
        next();
      } else {
        return res.json({ message: "Access Denied ❌" });
      }
    } catch {
      return res.json({ message: "Invalid Token ❌" });
    }
  };
}

// Admin
app.get("/admin", verifyRole(["admin"]), (req, res) => {
  res.json({ message: "Admin Content ✅" });
});

// Moderator
app.get("/moderator", verifyRole(["admin", "moderator"]), (req, res) => {
  res.json({ message: "Moderator Content ✅" });
});

// User
app.get("/user", verifyRole(["admin", "moderator", "user"]), (req, res) => {
  res.json({ message: "User Content ✅" });
});

app.listen(5002, () => console.log("Backend running on 5002"));
