import { useQuiz } from "../contexts/ReactQuizContext";

export default function FinishScreed() {
  const { points, maxPossiblePoint, highScore, dispatch } = useQuiz();
  const percentage = Math.round((points / maxPossiblePoint) * 100);
  let emoji = "";
  if (percentage > 90) emoji = "🥇";
  else if (percentage > 70) emoji = "🥈";
  else if (percentage > 50) emoji = "🥉";
  if (percentage < 50) emoji = "🤦‍♂️";

  return (
    <>
      <p className="result">
        <span> {emoji} </span>
        You scored <strong>{points}</strong> out of {maxPossiblePoint} (
        {percentage}%)
      </p>
      <p className="highscore">(High Score: {highScore})</p>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "restart" })}
      >
        {" "}
        Restart Quiz{" "}
      </button>
    </>
  );
}
