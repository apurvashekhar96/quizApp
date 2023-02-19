import React from "react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import Results from "./Results";
import GlobalContextProvider from "../contexts/globalContext";

describe("Testing the container component", () => {
  test("Container renders it's children", () => {
    render(
      <GlobalContextProvider>
        <Results />
      </GlobalContextProvider>
    );
    const chartHeading = screen.getByText("Results");
    expect(chartHeading).toBeInTheDocument();
  });
});
