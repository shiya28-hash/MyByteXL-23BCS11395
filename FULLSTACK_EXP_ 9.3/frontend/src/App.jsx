import React, { useState, useEffect } from "react";

export default function App() {
  const [data, setData] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api")
      .then(res => res.json())
      .then(setData)
      .catch(console.error);
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>🌐 Full Stack App on AWS (Load Balanced)</h1>
      {data ? (
        <>
          <p>{data.message}</p>
          <p><strong>Served from:</strong> {data.hostname}</p>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
