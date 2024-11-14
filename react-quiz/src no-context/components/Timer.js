import { useEffect } from "react";

export default function Timer({ dispatch, remainingTime }) {
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
