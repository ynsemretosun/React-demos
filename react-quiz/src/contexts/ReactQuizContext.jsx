import { createContext, useContext, useReducer, useEffect } from "react";
const QuizContext = createContext();
const initialState = {
  questions: [],
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highScore: 0,
  remainingTime: null,
};
const secondPerQuestion = 30;
function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataFailed":
      return { ...state, status: "error", questions: action.payload };
    case "start":
      return {
        ...state,
        status: "active",
        remainingTime: state.questions.length * secondPerQuestion,
      };
    case "newAnswer":
      const currQuestion = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === currQuestion.correctOption
            ? state.points + currQuestion.points
            : state.points,
      };
    case "finish":
      return {
        ...state,
        status: "finished",
        highScore:
          state.points > state.highScore ? state.points : state.highScore,
      };
    case "restart":
      return {
        ...initialState,
        highScore: state.highScore,
        status: "active",
        questions: state.questions,
      };
    case "nextQuestion":
      return { ...state, index: state.index + 1, answer: null };
    case "tick":
      return {
        ...state,
        remainingTime: state.remainingTime - 1,
        status: state.remainingTime === 0 ? "finish" : state.status,
      };

    default:
      throw new Error("Action type is unknown!");
  }
}

function QuizProvider({ children }) {
  const [
    { questions, status, index, answer, points, highScore, remainingTime },
    dispatch,
  ] = useReducer(reducer, initialState);

  const numQuest = questions.length;
  const maxPossiblePoint = questions.reduce(
    (prev, current) => prev + current.points,
    0
  );

  useEffect(function () {
    async function getData() {
      const res = await (
        await fetch("http://localhost:9000/questions").catch((err) =>
          dispatch({ type: "dataFailed", payload: err.message })
        )
      ).json();
      dispatch({ type: "dataReceived", payload: res });
    }
    getData();
  }, []);

  return (
    <QuizContext.Provider
      value={{
        status,
        index,
        answer,
        points,
        highScore,
        remainingTime,
        numQuest,
        maxPossiblePoint,
        dispatch,
        questions,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}
function useQuiz() {
  const context = useContext(QuizContext);
  if (context === null) {
    throw new Error("useQuiz must be used within a QuizProvider");
  }
  return context;
}

export { QuizProvider, useQuiz };
