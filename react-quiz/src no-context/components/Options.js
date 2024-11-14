export default function Options({ answer, question, dispatch }) {
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
          {console.log(question.correctOption)}
          {option}
        </button>
      ))}
    </div>
  );
}
