import { useQuiz } from "../contexts/ReactQuizContext";

export default function ProgressBar() {
  const { numQuest, index, points, maxPossiblePoint, answer } = useQuiz();
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
