import { useEffect } from "react";
import { useQuiz } from "../contexts/ReactQuizContext";

export default function Timer() {
  const { dispatch, remainingTime } = useQuiz();
  const mins = Math.floor(remainingTime / 60);
  const seconds = remainingTime % 60;
  useEffect(
    function () {
      const intervalId = setInterval(function () {
        dispatch({ type: "tick" });
      }, 1000);
      return () => clearInterval(intervalId);
    },
    [dispatch]
  );

  return (
    <div className="timer">
      {mins < 10 && "0"}
      {mins} : {seconds < 10 && "0"}
      {seconds}{" "}
    </div>
  );
}
