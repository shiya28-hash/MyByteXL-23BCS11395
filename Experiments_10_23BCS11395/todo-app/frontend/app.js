function App() {
  const [items, setItems] = React.useState([]);
  const [name, setName] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [editId, setEditId] = React.useState(null);

  React.useEffect(() => { fetchItems(); }, []);

  const fetchItems = () => {
    fetch("/api/items").then(r => r.json()).then(setItems);
  };

  const addItem = () => {
    if (!name || !price) return;
    fetch("/api/items", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, price })
    }).then(fetchItems);
    setName(""); setPrice("");
  };

  const updateItem = () => {
    fetch("/api/items/" + editId, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, price })
    }).then(() => {
      fetchItems();
      setEditId(null);
      setName("");
      setPrice("");
    });
  };

  const deleteItem = (id) => {
    fetch("/api/items/" + id, { method: "DELETE" }).then(fetchItems);
  };

  const startEdit = (item) => {
    setEditId(item.id);
    setName(item.name);
    setPrice(item.price);
  };

  return (
    <div style={{ textAlign: "center", marginTop: 40 }}>
      <h1>Fullstack CRUD App</h1>
      <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
      <input placeholder="Price" value={price} onChange={e => setPrice(e.target.value)} type="number" />
      <button onClick={editId ? updateItem : addItem}>{editId ? "Update" : "Add"}</button>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {items.map(i => (
          <li key={i.id}>
            {i.name} - ₹{i.price}
            <button onClick={() => startEdit(i)}>Edit</button>
            <button onClick={() => deleteItem(i.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
