import { ChangeEvent, useState } from "react";
import data from "../questionData";
import { useGlobalContext } from "../hooks/useGlobalContext";
import DragDrop from "./DragDrop";

type prop = {
  questionNo: number;
  callback: () => void;
};

const QuestionCard = ({ questionNo, callback }: prop) => {
  const { markedAnswers, handleSetMArkedAnswers } = useGlobalContext();
  let displayQuestionEl: JSX.Element = <div></div>;

  //finding the question
  const question = data.find((q) => q.questionNo === questionNo);

  //finding the current marked answer
  const currentQuesAns = markedAnswers.find(
    (ans) => ans.questionNo === question?.questionNo
  );
  let currentSelectedOpt = [""];
  if (currentQuesAns) {
    currentSelectedOpt = [...currentQuesAns.answer];
  }

  //handling question type 3 and 2
  const radioHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
    questionNo: number
  ) => {
    callback();
    const answer = markedAnswers.find((ans) => {
      return ans.questionNo === questionNo;
    });
    if (!answer) {
      handleSetMArkedAnswers([
        ...markedAnswers,
        { questionNo, answer: [`${e.target.value}`] },
      ]);
    } else {
      const newMarkedAnswer = markedAnswers.map((ans) => {
        if (ans.questionNo !== questionNo) {
          return ans;
        } else {
          return { questionNo: ans.questionNo, answer: [`${e.target.value}`] };
        }
      });
      handleSetMArkedAnswers([...newMarkedAnswer]);
    }
  };

  if (
    question?.questionType === "Choose the correct option" ||
    question?.questionType === "True or False"
  ) {
    const radioButtonEl = question.options.map((option, index) => {
      return (
        <p key={option}>
          <input
            type="radio"
            name="question"
            value={option}
            id={`option${index + 1}`}
            onChange={(e) => radioHandler(e, question.questionNo)}
            checked={currentSelectedOpt[0] === option}
          />
          <label htmlFor={`option${index + 1}`}>{option}</label>
        </p>
      );
    });
    displayQuestionEl = (
      <div>
        <h2>{question.questionType}</h2>
        <legend>{question.question}</legend>
        {radioButtonEl}
        {/* <p>
          <input
            type="radio"
            name="question"
            value={`${question.options[0]}`}
            id="option1"
            onChange={(e) => radioHandler(e, question.questionNo)}
            checked={currentSelectedOpt[0] === question.options[0]}
          ></input>
          <label htmlFor="option1">{question.options[0]}</label>
        </p>
        <p>
          <input
            type="radio"
            name="question"
            value={`${question.options[1]}`}
            id="option2"
            onChange={(e) => radioHandler(e, question.questionNo)}
            checked={currentSelectedOpt[0] === question.options[1]}
          ></input>
          <label htmlFor="option2">{question.options[1]}</label>
        </p>
        <p>
          <input
            type="radio"
            name="question"
            value={`${question.options[2]}`}
            id="option3"
            onChange={(e) => radioHandler(e, question.questionNo)}
            checked={currentSelectedOpt[0] === question.options[2]}
          ></input>
          <label htmlFor="option3">{question.options[2]}</label>
        </p>
        <p>
          <input
            type="radio"
            name="question"
            value={`${question.options[3]}`}
            id="option4"
            onChange={(e) => radioHandler(e, question.questionNo)}
            checked={currentSelectedOpt[0] === question.options[3]}
          ></input>
          <label htmlFor="option4">{question.options[3]}</label>
        </p> */}
      </div>
    );
  }

  //handling question type 1
  const handleTypedInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    callback();
    const answer = markedAnswers.find((ans) => {
      return ans.questionNo === questionNo;
    });
    if (!answer) {
      handleSetMArkedAnswers([
        ...markedAnswers,
        { questionNo, answer: [`${e.target.value}`] },
      ]);
    } else {
      const newMarkedAnswer = markedAnswers.map((ans) => {
        if (ans.questionNo !== questionNo) {
          return ans;
        } else {
          return { questionNo: ans.questionNo, answer: [`${e.target.value}`] };
        }
      });
      handleSetMArkedAnswers([...newMarkedAnswer]);
    }
  };

  if (question?.questionType === "Fill in the blanks") {
    displayQuestionEl = (
      <div>
        <h2>{question.questionType}</h2>
        <legend>{`${question.question}  (${question.options[0]}/${question.options[1]}/${question.options[2]})`}</legend>
        <label>
          Type Your Answer:{" "}
          {
            <input
              value={currentSelectedOpt[0]}
              onChange={handleTypedInputChange}
              className="typeAnswer"
              placeholder="typeAnswer"
            ></input>
          }
        </label>
      </div>
    );
  }

  //handling questiontype 4

  const checkBoxToggleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    callback();
    const answer = markedAnswers.find((ans) => {
      return ans.questionNo === questionNo;
    });
    if (!answer) {
      handleSetMArkedAnswers([
        ...markedAnswers,
        { questionNo, answer: [`${e.target.value}`] },
      ]);
    } else {
      const newMarkedAnswer = markedAnswers.map((ans) => {
        if (ans.questionNo !== questionNo) {
          return ans;
        } else {
          if (ans.answer.includes(`${e.target.value}`)) {
            const newAns = ans.answer.filter((a) => a !== e.target.value);
            return {
              questionNo: ans.questionNo,
              answer: [...newAns],
            };
          } else {
            return {
              questionNo: ans.questionNo,
              answer: [...ans.answer, `${e.target.value}`],
            };
          }
        }
      });
      handleSetMArkedAnswers([...newMarkedAnswer]);
    }
  };

  if (question?.questionType === "Choose all correct statements.") {
    const checkBoxEl = question.options.map((option, index) => {
      return (
        <p key={`option${index}`}>
          <input
            onChange={(e) => checkBoxToggleHandler(e)}
            value={option}
            id={`checkBox${index}`}
            type="checkbox"
            checked={currentSelectedOpt.includes(option)}
          />
          <label htmlFor={`checkBox${index}`}>{option}</label>
        </p>
      );
    });
    displayQuestionEl = (
      <div>
        <h2>{question.questionType}</h2>
        <legend>{question.question}</legend>
        <label>{checkBoxEl}</label>
      </div>
    );
  }

  //handle question type 5
  if (question?.questionType === "Match the Following") {
    displayQuestionEl = (
      <div>
        <h2>{question.questionType}</h2>
        <DragDrop
          question={question.question}
          options={question.options}
          callback={callback}
        />
      </div>
    );
  }

  return displayQuestionEl;
};

export default QuestionCard;
