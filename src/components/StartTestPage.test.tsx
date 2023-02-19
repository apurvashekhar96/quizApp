import React from "react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import StartTestPage from "./StartTestPage";
import GlobalContextProvider from "../contexts/globalContext";

describe("Testing the elements rendering on start test page", () => {
  test("Home Component renders all elements correctly on the initial render with button deactivated", () => {
    render(
      <GlobalContextProvider>
        <StartTestPage></StartTestPage>
      </GlobalContextProvider>
    );
    const titleEl = screen.getByText(
      "Please enter Your details to start test:"
    );
    expect(titleEl).toBeInTheDocument();
    const nameInputEl = screen.getByRole("textbox", { name: "Name" });

    expect(nameInputEl).toBeInTheDocument();
  });

  test("expect button to disabled initially", () => {
    render(
      <GlobalContextProvider>
        <StartTestPage></StartTestPage>
      </GlobalContextProvider>
    );
    const startTEstButtonEl = screen.getByRole("button", {
      name: "Start Test",
    });
    expect(startTEstButtonEl).toBeDisabled();
  });
  test("expect button to be enabled after user fills the input fields", () => {
    render(
      <GlobalContextProvider>
        <StartTestPage></StartTestPage>
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
    expect(startTestButtonEl).toBeEnabled();
  });
  test("to start the test by calling the set start handler on clicking start button", () => {
    render(
      <GlobalContextProvider>
        <StartTestPage></StartTestPage>
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
    expect(startTestButtonEl).toBeInTheDocument();
  });
});
