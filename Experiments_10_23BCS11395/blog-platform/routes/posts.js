const express = require("express");
const router = express.Router();
const { posts, users } = require("../data/store");
const { authenticate } = require("../middleware/auth");
const { generateId } = require("../utils/helpers");

router.post("/", authenticate, (req, res) => {
  const { title, content } = req.body;
  if (!title || !content)
    return res.status(400).json({ error: "title and content required" });

  const author = users.find((u) => u.id === req.user.id);
  if (!author) return res.status(404).json({ error: "author not found" });

  const post = {
    id: generateId("p"),
    title,
    content,
    authorId: author.id,
    authorName: author.username,
    comments: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  posts.unshift(post);
  res.status(201).json(post);
});

router.get("/", (req, res) => {
  const summary = posts.map((p) => ({
    id: p.id,
    title: p.title,
    authorName: p.authorName,
    commentsCount: p.comments.length,
    createdAt: p.createdAt,
  }));
  res.json(summary);
});

router.get("/:id", (req, res) => {
  const post = posts.find((p) => p.id === req.params.id);
  if (!post) return res.status(404).json({ error: "post not found" });
  res.json(post);
});

router.put("/:id", authenticate, (req, res) => {
  const post = posts.find((p) => p.id === req.params.id);
  if (!post) return res.status(404).json({ error: "post not found" });
  if (post.authorId !== req.user.id) return res.status(403).json({ error: "only author can edit" });

  const { title, content } = req.body;
  if (title) post.title = title;
  if (content) post.content = content;
  post.updatedAt = new Date().toISOString();
  res.json(post);
});

router.delete("/:id", authenticate, (req, res) => {
  const idx = posts.findIndex((p) => p.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: "post not found" });
  if (posts[idx].authorId !== req.user.id) return res.status(403).json({ error: "only author can delete" });

  posts.splice(idx, 1);
  res.json({ message: "post deleted" });
});

router.get("/explore/recent", (req, res) => {
  const recent = posts.slice(0, 10).map((p) => ({
    id: p.id,
    title: p.title,
    snippet: p.content.slice(0, 150),
    authorName: p.authorName,
    commentsCount: p.comments.length,
  }));
  res.json(recent);
});

module.exports = router;
