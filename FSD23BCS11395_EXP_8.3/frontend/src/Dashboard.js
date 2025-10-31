import axios from "axios";

function Dashboard() {

  const fetchRoleData = async (endpoint) => {
    const token = localStorage.getItem("token");

    const res = await axios.get(`http://localhost:5002/${endpoint}`, {
      headers: { authorization: `Bearer ${token}` }
    });

    alert(res.data.message);
  };

  return (
    <>
      <button onClick={() => fetchRoleData("admin")}>
        Access Admin
      </button>
      <br/><br/>

      <button onClick={() => fetchRoleData("moderator")}>
        Access Moderator
      </button>
      <br/><br/>

      <button onClick={() => fetchRoleData("user")}>
        Access User
      </button>
      <br/><br/>
    </>
  );
}

export default Dashboard;
