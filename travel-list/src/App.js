import Form from "./Form";
import Logo from "./Logo";
import PackingList from "./PackingList";
import Stats from "./Stats";
import "./index.css";
import { useState } from "react";
function App() {
  const [items, setItems] = useState([]);
  function handleAddItem(item) {
    setItems((items) => [...items, item]);
  }
  function handleDeleteItem(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }
  function handleUpdatePacked(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }
  function handleClearAll() {
    const confirmed = window.confirm(
      "You are about to clear whole list! Do you want to continue?"
    );
    if (confirmed) {
      setItems([]);
    } else {
      return;
    }
  }
  return (
    <div className="app">
      <Logo />
      <Form onAddItem={handleAddItem} items={items} />
      <PackingList
        items={items}
        onDeleteItem={handleDeleteItem}
        onUpdatePacked={handleUpdatePacked}
        clearAll={handleClearAll}
      />
      <Stats items={items} />
    </div>
  );
}
export default App;
