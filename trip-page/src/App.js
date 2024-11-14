import "./index.css";
import { useState } from "react";
const messages = [
  "Learn React ⚛️",
  "Apply for jobs 💼",
  "Invest your new income 🤑",
];

export default function App() {
  const [step, setStep] = useState(1);
  const [isOpen, setIsOpen] = useState(true);
  function handlePrev() {
    if (step > 1) {
      setStep((curStep) => curStep - 1);
    }
  }
  function handleNext() {
    if (step < 3) {
      setStep((curStep) => curStep + 1);
    }
  }
  return (
    <>
      <button
        className="close"
        onClick={() => {
          setIsOpen((isItOpen) => !isItOpen);
        }}
      >
        x
      </button>
      {isOpen && (
        <div className="steps">
          <div className="numbers">
            <div className={step >= 1 && "active"}>1</div>
            <div className={step >= 2 && "active"}>2</div>
            <div className={step >= 3 && "active"}>3</div>
          </div>
          <StepMessage step={step}>
            <p> {messages[step - 1]}</p>
          </StepMessage>
          <div className="buttons">
            <Button bgColor="#7950f2" color="#ffff" onClick={handlePrev}>
              <span>⬅️</span> Back
            </Button>
            <Button bgColor="#7950f2" color="#ffff" onClick={handleNext}>
              {" "}
              Next<span>➡️</span>{" "}
            </Button>
          </div>
        </div>
      )}
    </>
  );
}

function Button({ bgColor, color, onClick, children }) {
  return (
    <button
      style={{ backgroundColor: bgColor, color: color }}
      className="button"
      onClick={onClick}
    >
      {children}
    </button>
  );
}
function StepMessage({ step, children }) {
  return (
    <p className="message">
      <h3> Step {step}</h3>
      {children}
    </p>
  );
}
