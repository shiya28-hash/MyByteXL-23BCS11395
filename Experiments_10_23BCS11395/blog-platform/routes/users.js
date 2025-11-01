const express = require("express");
const router = express.Router();
const { users, posts } = require("../data/store");
const { authenticate } = require("../middleware/auth");

router.get("/me", authenticate, (req, res) => {
  const user = users.find((u) => u.id === req.user.id);
  if (!user) return res.status(404).json({ error: "user not found" });
  res.json({ id: user.id, username: user.username, bio: user.bio, createdAt: user.createdAt });
});

router.get("/:id", (req, res) => {
  const user = users.find((u) => u.id === req.params.id);
  if (!user) return res.status(404).json({ error: "user not found" });
  res.json({ id: user.id, username: user.username, bio: user.bio, createdAt: user.createdAt });
});

router.get("/:id/posts", (req, res) => {
  const userPosts = posts
    .filter((p) => p.authorId === req.params.id)
    .map((p) => ({ id: p.id, title: p.title, createdAt: p.createdAt, commentsCount: p.comments.length }));
  res.json(userPosts);
});

module.exports = router;
