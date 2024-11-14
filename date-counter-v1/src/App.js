import "./styles.css";
import { useState } from "react";
export default function App() {
  return (
    <div className="App">
      <Counter />
    </div>
  );
}
function Counter() {
  const [count, setCount] = useState(0);
  const [step, setStep] = useState(1);

  const date = new Date("june 21 2027");
  date.setDate(date.getDate() + count);
  return (
    <div>
      <div>
        <input
          type="range"
          max={10}
          min={0}
          value={step}
          onChange={(e) => setStep(Number(e.target.value))}
        ></input>
        <span> Step: {step} </span>
      </div>
      <div>
        <button onClick={() => setCount((c) => c - step)}> - </button>
        <span> Count: {count} </span>
        <button onClick={() => setCount((c) => c + step)}> + </button>
      </div>
      <p>
        <span>
          {count === 0 && "Today's date is: "}
          {count > 0 && `${count} days later the date is: `}
          {count < 0 && `${Math.abs(count)} days before the date is: `}
        </span>
        <span> {date.toDateString()}</span>
      </p>
      {step !== 1 && <button onClick={() => setStep(1)}>Reset</button>}
    </div>
  );
}
