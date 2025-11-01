const express = require("express");
const router = express.Router();
let { items } = require("../data/items");

router.get("/", (req, res) => res.json(items));

router.post("/", (req, res) => {
  const { name, price } = req.body;
  const newItem = { id: Date.now(), name, price };
  items.push(newItem);
  res.json(newItem);
});

router.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { name, price } = req.body;
  items = items.map(i => (i.id === id ? { ...i, name, price } : i));
  res.json({ message: "Updated" });
});

router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  items = items.filter(i => i.id !== id);
  res.json({ message: "Deleted" });
});

module.exports = router;
