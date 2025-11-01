const express = require("express");
const router = express.Router();
const { users } = require("../data/store");
const { hashPassword, comparePassword, generateId } = require("../utils/helpers");
const { generateToken } = require("../config/jwt");

router.post("/register", async (req, res) => {
  const { username, password, bio } = req.body;
  if (!username || !password)
    return res.status(400).json({ error: "username and password required" });

  if (users.find((u) => u.username === username))
    return res.status(409).json({ error: "username taken" });

  const id = generateId("u");
  const passwordHash = await hashPassword(password);
  const newUser = { id, username, passwordHash, bio: bio || "", createdAt: new Date().toISOString() };
  users.push(newUser);

  const token = generateToken(newUser);
  res.status(201).json({ id: newUser.id, username, bio: newUser.bio, token });
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res.status(400).json({ error: "username and password required" });

  const user = users.find((u) => u.username === username);
  if (!user) return res.status(401).json({ error: "invalid credentials" });

  const ok = await comparePassword(password, user.passwordHash);
  if (!ok) return res.status(401).json({ error: "invalid credentials" });

  const token = generateToken(user);
  res.json({ token, id: user.id, username: user.username, bio: user.bio });
});

module.exports = router;
