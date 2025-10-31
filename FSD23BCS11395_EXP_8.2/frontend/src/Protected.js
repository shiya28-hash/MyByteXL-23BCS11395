import axios from "axios";

function Protected() {
  const accessProtected = async () => {
    const token = localStorage.getItem("token");

    const res = await axios.get("http://localhost:5001/secret", {
      headers: {
        authorization: `Bearer ${token}`
      }
    });

    alert(res.data.message);
  };

  return (
    <button onClick={accessProtected}>
      Access Protected Route
    </button>
  );
}

export default Protected;
