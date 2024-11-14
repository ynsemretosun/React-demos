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
          <p className="message">
            Step {step}: {messages[step - 1]}
          </p>
          <div className="buttons">
            <button
              style={{ backgroundColor: "#7950f2", color: "#ffff" }}
              className="button"
              onClick={handlePrev}
            >
              Back
            </button>
            <button
              style={{ backgroundColor: "#7950f2", color: "#ffff" }}
              className="button"
              onClick={handleNext}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </>
  );
}
