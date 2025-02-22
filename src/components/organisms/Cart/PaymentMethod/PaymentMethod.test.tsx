import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import PaymentMethod from "./PaymentMethod";
import React from "react";

vi.mock("i18next", () => ({
  t: (key: string) => key,
}));

describe("PaymentMethod Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders all payment options", () => {
    render(<PaymentMethod />);

    const option1 = screen.getByTestId("payment-option-1");
    const option2 = screen.getByTestId("payment-option-2");

    expect(option1).toBeDefined();
    expect(option2).toBeDefined();
  });

  it("shows correct initial selected state", () => {
    render(<PaymentMethod />);

    const option1 = screen.getByTestId("payment-option-1");
    const option2 = screen.getByTestId("payment-option-2");

    expect(option1).toHaveAttribute("data-selected", "true");
    expect(option2).toHaveAttribute("data-selected", "false");
  });

  it("updates selection state on click", () => {
    render(<PaymentMethod />);

    const option2 = screen.getByTestId("payment-option-2");
    fireEvent.click(option2);

    expect(option2).toHaveAttribute("data-selected", "true");
    expect(screen.getByTestId("payment-option-1")).toHaveAttribute(
      "data-selected",
      "false"
    );
  });

  it("displays correct icons based on selection", () => {
    render(<PaymentMethod />);

    expect(
      screen.getByTestId("payment-icon-1").querySelector(".text-orange-500")
    ).toBeDefined();
    expect(
      screen.getByTestId("payment-icon-2").querySelector(".text-gray-400")
    ).toBeDefined();
    fireEvent.click(screen.getByTestId("payment-option-2"));
    expect(
      screen.getByTestId("payment-icon-1").querySelector(".text-gray-400")
    ).toBeDefined();
    expect(
      screen.getByTestId("payment-icon-2").querySelector(".text-orange-500")
    ).toBeDefined();
  });

  it("maintains selection state after multiple clicks", () => {
    render(<PaymentMethod />);
    const option2 = screen.getByTestId("payment-option-2");
    fireEvent.click(option2);
    expect(option2).toHaveAttribute("data-selected", "true");
    fireEvent.click(option2);
    expect(option2).toHaveAttribute("data-selected", "true");
  });
});
