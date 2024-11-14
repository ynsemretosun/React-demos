import { useQuiz } from "../contexts/ReactQuizContext";

export default function Options({ question }) {
  const { answer, dispatch } = useQuiz();
  const isResponded = answer !== null;
  return (
    <div className="options">
      {question.options.map((option, index) => (
        <button
          className={`btn btn-option ${index === answer ? "answer" : ""} ${
            isResponded
              ? index === question.correctOption
                ? "correct"
                : "wrong"
              : ""
          }
          }`}
          key={option}
          onClick={() => dispatch({ type: "newAnswer", payload: index })}
          disabled={answer !== null}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
