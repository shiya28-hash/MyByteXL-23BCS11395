import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (email === "test@gmail.com" && password === "12345") {
    return res.json({ message: "Login Successful ✅" });
  }

  res.json({ message: "Invalid Email or Password ❌" });
});

app.listen(5000, () => {
  console.log("Backend running on port 5000");
});
