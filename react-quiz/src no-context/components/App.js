import { useEffect } from "react";
import Header from "./Header";
import Main from "./Main";
import { useReducer } from "react";
import Loading from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Questions from "./Questions";
import NextQuestion from "../NextQuestion";
import ProgressBar from "./ProgressBar";
import FinishScreed from "./FinishScreen";
import Footer from "./Footer";
import Timer from "./Timer";
const secondPerQuestion = 30;
const initialState = {
  questions: [],
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highScore: 0,
  remainingTime: null,
};

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

export default function App() {
  const [
    { questions, status, index, answer, points, highScore, remainingTime },
    dispatch,
  ] = useReducer(reducer, initialState);

  useEffect(function () {
    async function getData() {
      const res = await (
        await fetch("http://localhost:9000/questions").catch((err) =>
          dispatch({ type: "dataFailed", payload: err.message })
        )
      ).json();
      console.log(res);
      dispatch({ type: "dataReceived", payload: res });
    }
    getData();
  }, []);
  const numQuest = questions.length;
  const maxPossiblePoint = questions.reduce(
    (prev, current) => prev + current.points,
    0
  );
  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loading />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen numQuest={numQuest} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
            <ProgressBar
              numQuest={numQuest}
              index={index}
              points={points}
              maxPossiblePoint={maxPossiblePoint}
              answer={answer}
            />
            <Questions
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />
            <Footer>
              <Timer dispatch={dispatch} remainingTime={remainingTime} />
              <NextQuestion
                dispatch={dispatch}
                answer={answer}
                index={index}
                numQuest={numQuest}
              />
            </Footer>
          </>
        )}
        {status === "finished" && (
          <FinishScreed
            points={points}
            maxPossiblePoint={maxPossiblePoint}
            highScore={highScore}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
}
