export default function Stats({ items }) {
  if (!items.length)
    return (
      <footer className="stats">
        <em>You have nothing in your list! Add some 🛍️</em>
      </footer>
    );
  const itemCounter = items.length;
  const packedCounter = items.filter((item) => item.packed).length;
  const percentOfPacked = Math.round((packedCounter / itemCounter) * 100);
  return (
    <footer className="stats">
      <em>
        {percentOfPacked === 100
          ? "You got everything you need! Ready to go! ✈️"
          : `You have ${itemCounter} items on your list and you already grab
        ${packedCounter} (${percentOfPacked}%) of them !`}
      </em>
    </footer>
  );
}
