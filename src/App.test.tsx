import React from "react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import App from "./App";
import GlobalContextProvider from "./contexts/globalContext";

describe("Testing the container component", () => {
  test("Container renders it's children", () => {
    render(
      <GlobalContextProvider>
        <App />
      </GlobalContextProvider>
    );
    const nameInputEl = screen.getByRole("textbox", { name: "Name" });
    const emailInputEl = screen.getByRole("textbox", { name: "Email Id" });
    const mobileInputEl = screen.getByRole("textbox", { name: "Mobile No" });
    const languageInputEl = screen.getByRole("combobox", {
      name: "Select Language",
    });

    const startTestButtonEl = screen.getByRole("button", {
      name: "Start Test",
    });

    userEvent.type(nameInputEl, "test");
    userEvent.type(emailInputEl, "ap@ap.com");
    userEvent.type(mobileInputEl, "92929292");
    userEvent.selectOptions(languageInputEl, "English");
    userEvent.click(startTestButtonEl);
    const questionNo5Text = screen.getByText("5");
    userEvent.click(questionNo5Text);
    const finishButton = screen.getByRole("button", { name: "Submit Test" });
    userEvent.click(finishButton);
    setTimeout(() => {
      const chartHeading = screen.getByText("Results");
      expect(chartHeading).toBeInTheDocument();
    }, 5000);
  });
});
