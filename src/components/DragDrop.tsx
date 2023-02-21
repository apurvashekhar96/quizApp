import "./DragDrop.css";
import { useGlobalContext } from "../hooks/useGlobalContext";

interface drag {
  question: string[] | string;
  options: string[];
  callback: () => void;
}

const DragDrop = ({ question, options, callback }: drag) => {
  const { markedAnswers, handleSetMArkedAnswers } = useGlobalContext();

  let optionsArray = [""];
  let newOptionsArray = markedAnswers.find((ans) => ans.questionNo === 5);

  if (newOptionsArray) {
    optionsArray = [...newOptionsArray.answer];
  } else {
    optionsArray = [...options, "", "", "", ""];
  }

  ///
  let dragEl: string;
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.stopPropagation();
    callback();
    if (e.currentTarget.id !== dragEl) {
      let newArr = [...optionsArray];
      const dragFromVal = newArr[Number(dragEl)];
      const dragToVal = newArr[Number(e.currentTarget.id)];
      newArr[Number(dragEl)] = dragToVal;
      newArr[Number(e.currentTarget.id)] = dragFromVal;
      optionsArray = [...newArr];
      const answer = markedAnswers.find((ans) => {
        return ans.questionNo === 5;
      });
      if (!answer) {
        handleSetMArkedAnswers([
          ...markedAnswers,
          { questionNo: 5, answer: [...optionsArray] },
        ]);
      } else {
        const newMarkedAnswer = markedAnswers.map((ans) => {
          if (ans.questionNo !== 5) {
            return ans;
          } else {
            return {
              questionNo: 5,
              answer: [...optionsArray],
            };
          }
        });
        handleSetMArkedAnswers([...newMarkedAnswer]);
      }

      return false;
    }
  };

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    //e.stopPropagation();
    //(event.originalEvent || event)
    dragEl = e.currentTarget.id;
    e.dataTransfer.effectAllowed = "move";
    if (e.currentTarget.textContent)
      e.dataTransfer.setData("text/html", e.currentTarget.textContent);
    return false;
  };

  let dragQuesEl: JSX.Element[] = [];
  if (typeof question !== "string") {
    dragQuesEl = question.map((q) => (
      <div key={q} className="dragQuesEl">
        {q}
      </div>
    ));
  }
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    return false;
  };

  const dragAnsEl = optionsArray.slice(0, 4).map((opt, index) => {
    return (
      <div
        key={`${opt}${index}`}
        draggable="true"
        id={`${index}`}
        onDrop={handleDrop}
        onDragStart={(e) => handleDragStart(e)}
        onDragOver={handleDragOver}
        className="draggable dragAnsEl"
      >
        {opt || ""}
      </div>
    );
  });

  return (
    <div className="outerDragContanier">
      <div className="dragContainer">
        <div className="dragQuesContainer">{dragQuesEl}</div>
        <div className="dragAnsContainer">
          <div
            data-testid="testEl1"
            id={`${4}`}
            draggable="true"
            onDrop={handleDrop}
            onDragStart={(e) => handleDragStart(e)}
            onDragOver={handleDragOver}
            className="draggable dragAnsElOp"
          >
            {optionsArray[4]}
          </div>
          <div
            id={`${5}`}
            draggable="true"
            onDrop={handleDrop}
            onDragStart={(e) => handleDragStart(e)}
            onDragOver={handleDragOver}
            className="draggable dragAnsElOp"
          >
            {optionsArray[5]}
          </div>
          <div
            id={`${6}`}
            draggable="true"
            onDrop={handleDrop}
            onDragStart={(e) => handleDragStart(e)}
            onDragOver={handleDragOver}
            className="draggable dragAnsElOp"
          >
            {optionsArray[6]}
          </div>
          <div
            data-testid="testEl4"
            id={`${7}`}
            draggable="true"
            onDrop={handleDrop}
            onDragStart={(e) => handleDragStart(e)}
            onDragOver={handleDragOver}
            className="draggable dragAnsElOp"
          >
            {optionsArray[7]}
          </div>
        </div>
      </div>
      <div className="dragOptionsContainer">{dragAnsEl}</div>
    </div>
  );
};

export default DragDrop;
