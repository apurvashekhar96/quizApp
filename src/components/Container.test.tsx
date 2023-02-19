import React from "react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import Container from "./Container";

describe("Testing the container component", () => {
  test("Container renders it's chi;dren", () => {
    render(
      <Container>
        <div>Hello World</div>
      </Container>
    );
    const helloText = screen.getByText("Hello World");
    expect(helloText).toBeInTheDocument();
  });
});
