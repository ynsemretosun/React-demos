export default function Item({ item, onDeleteItem, onUpdatePacked }) {
  return (
    <li>
      <input type="checkbox" onChange={() => onUpdatePacked(item.id)} />
      <span style={item.packed ? { textDecorationLine: "line-through" } : {}}>
        {item.quantity}x {item.description}
      </span>
      <button onClick={() => onDeleteItem(item.id)}> ❌ </button>
    </li>
  );
}
