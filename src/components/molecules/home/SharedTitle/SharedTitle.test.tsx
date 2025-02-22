import { render, screen } from "@testing-library/react";
import { expect } from "vitest";
import "@testing-library/jest-dom";
import SharedTitle from "./SharedTitle";
import React from "react";

describe("SharedTitle Component", () => {
  it("renders the text correctly", () => {
    render(<SharedTitle text="My Shared Title" />);

    const textElement = screen.getByText("My Shared Title");
    expect(textElement).toBeInTheDocument();
  });

  it("applies the correct class to the container", () => {
    render(<SharedTitle text="Title with Class" />);

    const container = screen.getByText("Title with Class").parentElement;
    expect(container).toHaveClass("text-center");
    expect(container).toHaveClass("py-4");
    expect(container).toHaveClass("relative");
  });

  it("applies the correct styles to the container for pseudo-element", () => {
    render(<SharedTitle text="Title with Before Line" />);

    const container = screen.getByText("Title with Before Line").parentElement;
    expect(container).toHaveClass("before:absolute");
    expect(container).toHaveClass("before:content-['']");
    expect(container).toHaveClass("before:bottom-0");
    expect(container).toHaveClass("before:left-0");
    expect(container).toHaveClass("before:bg-main");
    expect(container).toHaveClass("before:h-[2px]");
    expect(container).toHaveClass("before:w-full");
  });

  it("applies the correct class to the text element", () => {
    render(<SharedTitle text="Styled Title" />);

    const textElement = screen.getByText("Styled Title");
    expect(textElement).toHaveClass("text-3xl");
    expect(textElement).toHaveClass("font-medium");
  });

  it("renders with an optional className prop", () => {
    render(
      <SharedTitle text="Title with Custom Class" className="custom-class" />
    );

    const container = screen.getByText("Title with Custom Class").parentElement;
    expect(container).toHaveClass("custom-class");
  });
});
