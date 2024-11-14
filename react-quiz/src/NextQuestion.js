import { useQuiz } from "./contexts/ReactQuizContext";

export default function NextQuestion() {
  const { dispatch, answer, index, numQuest } = useQuiz();
  if (answer === null) return null;
  if (index < numQuest - 1)
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "nextQuestion" })}
      >
        {" "}
        Next Question
      </button>
    );
  if (index === numQuest - 1)
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "finish" })}
      >
        {" "}
        Finish Quiz
      </button>
    );
}
