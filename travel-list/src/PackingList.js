import Item from "./Item";
import { useState } from "react";

export default function PackingList({
  items,
  onDeleteItem,
  onUpdatePacked,
  clearAll,
}) {
  const [orderBy, setOrderBy] = useState("input");
  let orderedList;
  if (orderBy === "input") orderedList = items;
  if (orderBy === "description")
    orderedList = items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));
  if (orderBy === "packed")
    orderedList = items
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));
  return (
    <div className="list">
      <ul>
        {orderedList.map((item) => (
          <Item
            item={item}
            key={item.id}
            onDeleteItem={onDeleteItem}
            onUpdatePacked={onUpdatePacked}
          />
        ))}
      </ul>
      <div>
        <select value={orderBy} onChange={(e) => setOrderBy(e.target.value)}>
          <option value="input"> SORT BY INPUT ORDER</option>
          <option value="description"> SORT BY DESCRIPTION </option>
          <option value="packed"> SORT BY PACKED STATUS </option>
        </select>
        <button onClick={() => clearAll()}>Clear List</button>
      </div>
    </div>
  );
}
