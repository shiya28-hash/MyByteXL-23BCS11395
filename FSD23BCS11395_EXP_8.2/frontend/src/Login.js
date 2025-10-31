import axios from "axios";

function Login() {
  const loginNow = async () => {
    const res = await axios.post("http://localhost:5001/login");
    localStorage.setItem("token", res.data.token);
    alert("Logged in ✅ Token Saved");
  };

  return (
    <button onClick={loginNow}>
      Login to Get JWT Token
    </button>
  );
}

export default Login;
