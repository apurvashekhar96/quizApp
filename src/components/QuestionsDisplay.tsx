import data from "../questionData";
import "./QuestionDisplay.css";
import QuestionCard from "./QuestionCard";
import { useState } from "react";
import { useGlobalContext } from "../hooks/useGlobalContext";

let modifiedData = data.map((question) => {
  const questionNo = question.questionNo;
  let isOpened = false;
  let isAnswered = false;

  return { questionNo, isOpened, isAnswered };
});

const QuestionsDisplay = () => {
  const [index, setIndex] = useState(1);
  const { handleSetEnded } = useGlobalContext();

  const handleQuesNoClick = (questionNo: number) => {
    setIndex(questionNo);
    const newModifiedData = modifiedData.map((dataEl) => {
      if (dataEl.questionNo !== questionNo) return dataEl;
      dataEl.isOpened = true;
      return { ...dataEl };
    });

    modifiedData = [...newModifiedData];
  };

  const handleAnswering = () => {
    const newModifiedData = modifiedData.map((dataEl) => {
      if (dataEl.questionNo !== index) return dataEl;
      dataEl.isAnswered = true;
      return { ...dataEl };
    });

    modifiedData = [...newModifiedData];
  };
  const handleNext = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const newModifiedData = modifiedData.map((dataEl) => {
      if (dataEl.questionNo !== index) return dataEl;
      dataEl.isOpened = true;
      return { ...dataEl };
    });

    modifiedData = [...newModifiedData];
    setIndex((prevIndex) => prevIndex + 1);
  };

  const handlePrev = () => {
    setIndex((prevIndex) => prevIndex - 1);
  };
  const handleSubmit = () => {
    handleSetEnded();
  };

  const quesNoEl = modifiedData.map((ques) => {
    return (
      <div
        key={ques.questionNo}
        onClick={() => handleQuesNoClick(ques.questionNo)}
        className={`questionNo ${
          ques.isOpened && ques.isAnswered && "isAnswered"
        } ${ques.isOpened && !ques.isAnswered && "isUnanswered"} ${
          index === ques.questionNo ? "active" : ""
        }`}
      >
        {ques.questionNo}
      </div>
    );
  });

  return (
    <div>
      <div className="quesNoElContainer">{quesNoEl}</div>
      <div>
        <QuestionCard
          callback={handleAnswering}
          questionNo={index}
        ></QuestionCard>
        <div>
          <button
            disabled={index < 2}
            onClick={handlePrev}
            className="prevButton"
          >
            Prev
          </button>
        </div>
        <div>
          {index < 5 ? (
            <button onClick={handleNext} className="nextButton">
              Next
            </button>
          ) : (
            <button onClick={handleSubmit}>Submit Test</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuestionsDisplay;
