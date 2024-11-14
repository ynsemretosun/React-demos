import { useState } from "react";
import "./styles.css";
function App() {
  return (
    <div className="App">
      <TipCalculator></TipCalculator>
    </div>
  );
}

export default App;

function TipCalculator() {
  const [bill, setBill] = useState(null);
  const [tip1, setTip1] = useState(0);
  const [tip2, setTip2] = useState(0);
  const tip = (bill * (Number(tip1) + Number(tip2))) / 2 / 100;
  function handleReset() {
    setBill(() => "");
    setTip1(() => 0);
    setTip2(() => 0);
  }
  return (
    <>
      <div>
        <Bill bill={bill} setBill={setBill} />
        <Tip tip={tip1} tipChanged={setTip1}>
          How did u like service?
        </Tip>
      </div>
      <div>
        <Tip tip={tip2} tipChanged={setTip2}>
          How did ur friend like service?
        </Tip>
      </div>
      {bill > 0 && (
        <>
          <Output total={Number(bill) + tip} tip={tip} bill={bill} />
          <Reset handleReset={handleReset} />{" "}
        </>
      )}
    </>
  );
}

function Bill({ bill, setBill }) {
  return (
    <div>
      <label> How much was the bill? </label>
      <input
        value={bill}
        onChange={(e) => setBill(() => e.target.value)}
        placeholder="Enter the bill"
      ></input>
    </div>
  );
}

function Tip({ tip, tipChanged, children }) {
  return (
    <>
      {children}
      <select value={tip} onChange={(e) => tipChanged(() => e.target.value)}>
        <option value={Number(0)}> Dissatisfied (0%)</option>
        <option value={5}> It was okey (5%)</option>
        <option value={10}> It was good (10%)</option>
        <option value={20}> Absolutely amazing (20%)</option>
      </select>
    </>
  );
}

function Output({ total, tip, bill }) {
  return (
    <>
      <h2>
        You will pay ${total} {tip > 0 ? `($${bill} + $${tip} for tip)` : ""}
      </h2>
    </>
  );
}

function Reset({ handleReset }) {
  return <button onClick={handleReset}> Reset </button>;
}
