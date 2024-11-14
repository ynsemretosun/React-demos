export default function ProgressBar({
  numQuest,
  index,
  points,
  maxPossiblePoint,
  answer,
}) {
  return (
    <header className="progress">
      <progress
        max={numQuest}
        value={index + Number(answer !== null)}
      ></progress>
      <p>
        Question
        <strong> {index + 1} </strong> / {numQuest}
      </p>
      <p>
        <strong>{points}</strong> / {maxPossiblePoint} Points
      </p>
    </header>
  );
}
