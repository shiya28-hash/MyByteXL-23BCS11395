import axios from "axios";
import { useState } from "react";

function Login() {
  const [role, setRole] = useState("");

  const loginNow = async () => {
    const res = await axios.post("http://localhost:5002/login", { role });
    localStorage.setItem("token", res.data.token);
    alert("Logged in as " + role + " ✅");
  };

  return (
    <>
      <input
        placeholder="Enter Role (admin/moderator/user)"
        onChange={(e) => setRole(e.target.value)}
      /><br/><br/>
      <button onClick={loginNow}>Login</button>
      <br/><br/>
    </>
  );
}

export default Login;
