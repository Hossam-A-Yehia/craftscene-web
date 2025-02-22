import { render, screen } from "@testing-library/react";
import { expect } from "vitest";
import "@testing-library/jest-dom";
import ErrorMessage from "./ErrorMessage";
import React from "react";

describe("ErrorMessage Component", () => {
  it("renders the error message correctly", () => {
    render(<ErrorMessage />);

    const icon = screen.getByTestId("error-message-icon");
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveClass("text-red-500");

    const message = screen.getByTestId("error-message-text");
    expect(message).toBeInTheDocument();
    expect(message).toHaveClass("text-center text-sm");

    const errorDiv = screen.getByTestId("error-message-container");
    expect(errorDiv).toHaveClass("bg-red-100");
    expect(errorDiv).toHaveClass("border-red-500");
  });
});
