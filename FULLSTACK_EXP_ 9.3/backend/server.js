const express = require("express");
const cors = require("cors");
const os = require("os");

const app = express();
app.use(cors());

app.get("/api", (req, res) => {
  res.json({
    message: "Hello from Backend!",
    hostname: os.hostname(),
  });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
