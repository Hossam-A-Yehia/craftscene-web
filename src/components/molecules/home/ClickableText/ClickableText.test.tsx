import { render, screen, fireEvent } from "@testing-library/react";
import { expect, vi } from "vitest";
import "@testing-library/jest-dom";
import ClickableText from "./ClickableText";
import React from "react";

describe("ClickableText Component", () => {
  it("renders the text correctly", () => {
    render(
      <ClickableText text="Click Me" onClick={vi.fn()} isActive={false} />
    );

    const textElement = screen.getByTestId("clickable-text");
    expect(textElement).toBeInTheDocument();
  });

  it("applies active class when isActive is true", () => {
    render(
      <ClickableText text="Active Text" onClick={vi.fn()} isActive={true} />
    );

    const textElement = screen.getByTestId("clickable-text");
    expect(textElement).toHaveClass("text-main");
  });

  it("applies inactive class when isActive is false", () => {
    render(
      <ClickableText text="Inactive Text" onClick={vi.fn()} isActive={false} />
    );

    const textElement = screen.getByTestId("clickable-text");
    expect(textElement).toHaveClass("text-[#898989]");
  });

  it("calls onClick when clicked", () => {
    const onClick = vi.fn();
    render(
      <ClickableText text="Click Me" onClick={onClick} isActive={false} />
    );

    const textElement = screen.getByTestId("clickable-text");
    fireEvent.click(textElement);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("has the correct styles for the hover effect", () => {
    render(
      <ClickableText text="Hover Me" onClick={vi.fn()} isActive={false} />
    );
    const textElement = screen.getByTestId("clickable-text");
    expect(textElement).toHaveClass("cursor-pointer");
    expect(textElement).toHaveClass("hover:text-main");
  });
});
