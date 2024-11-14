import Header from "./Header";
import Main from "./Main";
import Loading from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Questions from "./Questions";
import NextQuestion from "../NextQuestion";
import ProgressBar from "./ProgressBar";
import FinishScreed from "./FinishScreen";
import Footer from "./Footer";
import Timer from "./Timer";
import { useQuiz } from "../contexts/ReactQuizContext";

export default function App() {
  const { status } = useQuiz();
  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loading />}
        {status === "error" && <Error />}
        {status === "ready" && <StartScreen />}
        {status === "active" && (
          <>
            <ProgressBar />
            <Questions />
            <Footer>
              <Timer />
              <NextQuestion />
            </Footer>
          </>
        )}
        {status === "finished" && <FinishScreed />}
      </Main>
    </div>
  );
}
