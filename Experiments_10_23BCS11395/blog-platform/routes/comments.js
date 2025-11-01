const express = require("express");
const router = express.Router();
const { posts, users } = require("../data/store");
const { authenticate } = require("../middleware/auth");
const { generateId } = require("../utils/helpers");

router.post("/:postId", authenticate, (req, res) => {
  const post = posts.find((p) => p.id === req.params.postId);
  if (!post) return res.status(404).json({ error: "post not found" });

  const { content } = req.body;
  if (!content) return res.status(400).json({ error: "content required" });

  const commenter = users.find((u) => u.id === req.user.id);
  const comment = {
    id: generateId("c"),
    content,
    authorId: commenter.id,
    authorName: commenter.username,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  post.comments.push(comment);
  res.status(201).json(comment);
});

router.put("/:postId/:commentId", authenticate, (req, res) => {
  const post = posts.find((p) => p.id === req.params.postId);
  if (!post) return res.status(404).json({ error: "post not found" });

  const comment = post.comments.find((c) => c.id === req.params.commentId);
  if (!comment) return res.status(404).json({ error: "comment not found" });
  if (comment.authorId !== req.user.id)
    return res.status(403).json({ error: "only author can edit comment" });

  const { content } = req.body;
  if (!content) return res.status(400).json({ error: "content required" });
  comment.content = content;
  comment.updatedAt = new Date().toISOString();
  res.json(comment);
});

router.delete("/:postId/:commentId", authenticate, (req, res) => {
  const post = posts.find((p) => p.id === req.params.postId);
  if (!post) return res.status(404).json({ error: "post not found" });

  const cIdx = post.comments.findIndex((c) => c.id === req.params.commentId);
  if (cIdx === -1) return res.status(404).json({ error: "comment not found" });

  if (post.comments[cIdx].authorId !== req.user.id && post.authorId !== req.user.id)
    return res.status(403).json({ error: "only comment author or post author can delete" });

  post.comments.splice(cIdx, 1);
  res.json({ message: "comment deleted" });
});

module.exports = router;
