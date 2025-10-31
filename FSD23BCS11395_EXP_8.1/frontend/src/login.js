import { useState } from "react";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const loginUser = async () => {
    const res = await axios.post("http://localhost:5000/login", {
      email,
      password
    });
    setMsg(res.data.message);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Login Form</h2>
      <input
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      /><br/><br/>

      <input
        placeholder="Password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      /><br/><br/>

      <button onClick={loginUser}>Login</button>

      <h3>{msg}</h3>
    </div>
  );
}

export default Login;
