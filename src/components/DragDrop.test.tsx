import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import DragDrop from "./DragDrop";
import GlobalContextProvider from "../contexts/globalContext";
import "@testing-library/jest-dom";

describe("DragDrop testing behaviouf of the ui", () => {
  test("renders question and options", () => {
    const question = ["Question 1", "Question 2", "Question 3", "Question 4"];
    const options = ["Option 1", "Option 2", "Option 3", "Option 4"];
    render(
      <GlobalContextProvider>
        <DragDrop question={question} options={options} callback={() => {}} />
      </GlobalContextProvider>
    );
    question.forEach((q) => {
      expect(screen.getByText(q)).toBeInTheDocument();
    });
    options.forEach((o) => {
      expect(screen.getByText(o)).toBeInTheDocument();
    });
  });

  test("allows dragging and dropping options", () => {
    const question = ["Question 1", "Question 2", "Question 3", "Question 4"];
    const options = ["Option 1", "Option 2", "Option 3", "Option 4"];
    const callback = jest.fn();
    const setData = jest.fn();
    render(
      <GlobalContextProvider>
        <DragDrop question={question} options={options} callback={callback} />
      </GlobalContextProvider>
    );
    const draggableOption = screen.getByText(options[0]);
    const draggableOption3 = screen.getByText(options[3]);
    const droppableOption = screen.getByTestId("testEl1");
    fireEvent.dragStart(draggableOption, {
      dataTransfer: {
        effectAllowed: "move",
        setData: setData,
      },
    });
    const droppableOption3 = screen.getByTestId("testEl1");
    fireEvent.dragStart(draggableOption3, {
      dataTransfer: {
        effectAllowed: "move",
        setData: setData,
      },
    });

    fireEvent.drop(droppableOption);
    fireEvent.drop(droppableOption3);
    expect(callback).toHaveBeenCalledTimes(2);
  });
});
