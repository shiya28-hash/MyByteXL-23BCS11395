const express = require("express");
const cors = require("cors");
const path = require("path");
const itemsRoute = require("./routes/items");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use("/api/items", itemsRoute);

// Serve frontend files
app.use(express.static(path.join(__dirname, "../frontend")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/index.html"));
});

app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
