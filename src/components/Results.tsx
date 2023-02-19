import { useGlobalContext } from "../hooks/useGlobalContext";
import data from "../questionData";
import { PieChart, Pie, Cell, Legend } from "recharts";

const Results = () => {
  const { markedAnswers } = useGlobalContext();
  let corAns = 0;
  let attempted = 0;

  const COLORS = ["#808080", "	#454B1B", "#FF0000"];
  type pieDataType = {
    name: string;
    value: number;
  }[];
  let pieData: pieDataType = [];
  const MarksCalculation = () => {
    const modifiedMarkedAnswers = markedAnswers.map((answer) => {
      if (answer.questionNo === 5) {
        return {
          questionNo: answer.questionNo,
          answer: answer.answer.slice(4),
        };
      } else if (answer.questionNo === 4) {
        return {
          questionNo: answer.questionNo,
          answer: answer.answer.sort(),
        };
      }
      return answer;
    });
    const attemptedQuestions = modifiedMarkedAnswers.map((ans) => {
      return ans.questionNo;
    });
    attempted = attemptedQuestions.length;

    modifiedMarkedAnswers.forEach((answer) => {
      if (attemptedQuestions.includes(answer.questionNo)) {
        const correctQuestionAnswer = data.find((d) => {
          return d.questionNo === answer.questionNo;
        });
        console.log(correctQuestionAnswer);
        console.log(correctQuestionAnswer?.correctAnswer);
        console.log(answer.answer);
        if (
          JSON.stringify(answer.answer) ===
          JSON.stringify(correctQuestionAnswer?.correctAnswer)
        ) {
          corAns++;
        }

        pieData = [
          {
            name: "Unattempted Questions",
            value: data.length - attemptedQuestions.length,
          },
          {
            name: "correct Answers",
            value: corAns,
          },
          {
            name: "Incorrect markedAnswers",
            value: attemptedQuestions.length - corAns,
          },
        ];
      }
    });
  };

  MarksCalculation();
  return (
    <div className="resultsContainer">
      <div>Results</div>
      <div>{`Attempted Questions: ${attempted} | Correct Answers: ${corAns}`}</div>
      <div>{corAns}</div>
      <PieChart width={730} height={300}>
        <Pie
          data={pieData}
          color="#000000"
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={120}
          fill="#8884d8"
        >
          {pieData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Legend />
      </PieChart>
    </div>
  );
};
export default Results;
