import React from "react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import QuestionsDisplay from "./QuestionsDisplay";
import GlobalContextProvider from "../contexts/globalContext";

describe("Testing the container component", () => {
  test("Container renders it's children", () => {
    render(<QuestionsDisplay></QuestionsDisplay>);
    const questionNo1Text = screen.getByText("1");
    expect(questionNo1Text).toBeInTheDocument();
    const questionNo2Text = screen.getByText("2");
    userEvent.click(questionNo2Text);
    expect(questionNo2Text).toHaveClass("active");
    expect(questionNo2Text).toHaveClass("isUnanswered");
    userEvent.click(questionNo1Text);
    const inputEl = screen.getByPlaceholderText("typeAnswer");
    userEvent.type(inputEl, "best");
    userEvent.click(questionNo2Text);
    expect(questionNo1Text).toHaveClass("isAnswered");
    const nextButton = screen.getByRole("button", { name: "Next" });
    userEvent.click(nextButton);
    expect(inputEl).not.toBeInTheDocument();
    const prevButton = screen.getByRole("button", { name: "Prev" });
    userEvent.click(prevButton);
    expect(inputEl).not.toBeInTheDocument();
  });

  test("all question answered", () => {
    render(
      <GlobalContextProvider>
        <QuestionsDisplay></QuestionsDisplay>
      </GlobalContextProvider>
    );
    const inputEl = screen.getByPlaceholderText("typeAnswer");
    userEvent.type(inputEl, "best");
    const nextButton = screen.getByRole("button", { name: "Next" });
    userEvent.click(nextButton);
    const selectTrueButton = screen.getByLabelText("true");
    userEvent.click(selectTrueButton);
    userEvent.click(nextButton);
    const selectOptionButton = screen.getByLabelText("Babel");
    userEvent.click(selectOptionButton);
    userEvent.click(nextButton);
    const selectVirtualDomButton = screen.getByLabelText("Virtual DOM");
    userEvent.click(selectVirtualDomButton);
    const prevButton = screen.getByRole("button", { name: "Prev" });
    userEvent.click(prevButton);
    expect(selectOptionButton).toBeChecked();
    userEvent.click(nextButton);
    const selectStateManagementButton =
      screen.getByLabelText("State Management");
    userEvent.click(selectStateManagementButton);
    userEvent.click(nextButton);
    userEvent.click(prevButton);
    expect(selectStateManagementButton).toBeChecked();
    expect(selectVirtualDomButton).toBeChecked();
    const selectNoUseOfClassesButton =
      screen.getByLabelText("No use of Classes");
    expect(selectNoUseOfClassesButton).not.toBeChecked();
    const fifthQuesButton = screen.getByText("5");
    userEvent.click(fifthQuesButton);
    const finishButton = screen.getByRole("button", { name: "Submit Test" });
    userEvent.click(finishButton);
    setTimeout(() => {
      const chartHeading = screen.getByText("Results");
      expect(chartHeading).toBeInTheDocument();
    }, 5000);
  });
});
