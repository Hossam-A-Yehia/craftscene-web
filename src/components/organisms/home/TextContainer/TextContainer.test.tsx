import { render, screen, fireEvent } from "@testing-library/react";
import { expect, vi } from "vitest";
import TextContainer from "./TextContainer";
import React from "react";

vi.mock("i18next", () => ({
  t: vi.fn((key: string) => key),
}));

describe("TextContainer Component", () => {
  const mockSetNext = vi.fn();

  const renderComponent = (next: string) =>
    render(<TextContainer next={next} setNext={mockSetNext} />);

  it("renders all clickable text options", () => {
    renderComponent("");
    const options = [
      "home.features.ideas",
      "home.features.products",
      "home.features.professionals",
      "home.features.suppliers",
    ];
    options.forEach((option) => {
      const text = screen.getByText(option);
      expect(text).toBeInTheDocument();
    });
  });

  it("renders separators (/) between text options except the first one", () => {
    renderComponent("");
    const separators = screen.getAllByText("/");
    expect(separators).toHaveLength(3);
  });

  it("calls setNext with the correct label when a clickable text is clicked", () => {
    renderComponent("");
    const textToClick = screen.getByText("home.features.products");
    fireEvent.click(textToClick);
    expect(mockSetNext).toHaveBeenCalledWith("Products");
  });

  it("does not apply the active state to inactive texts", () => {
    renderComponent("Ideas");
    const inactiveText = screen.getByText("home.features.products");
    expect(inactiveText).not.toHaveClass("active");
  });
});
