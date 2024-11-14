import { useQuiz } from "../contexts/ReactQuizContext";
import Options from "./Options";
export default function Questions() {
  const { questions, index } = useQuiz();
  const question = questions.at(index);
  return (
    <div>
      <h2>{question.question}</h2>
      <Options question={question} />
    </div>
  );
}
