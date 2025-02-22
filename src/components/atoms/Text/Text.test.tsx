import { render, screen } from "@testing-library/react";
import { expect } from "vitest";
import "@testing-library/jest-dom";
import Text from "./Text";
import React from "react";

describe("Text Component", () => {
  it("renders the children correctly", () => {
    render(<Text>Sample Text</Text>);

    const textElement = screen.getByText("Sample Text");
    expect(textElement).toBeInTheDocument();
    expect(textElement.tagName).toBe("P");
  });

  it("applies the className prop correctly", () => {
    render(<Text className="custom-class">Styled Text</Text>);

    const textElement = screen.getByText("Styled Text");
    expect(textElement).toHaveClass("custom-class");
  });

  it("renders without a className when none is provided", () => {
    render(<Text>No ClassName</Text>);

    const textElement = screen.getByText("No ClassName");
    expect(textElement).not.toHaveAttribute("class");
  });
});
