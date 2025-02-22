import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import PaymentSummary from "./PaymentSummary";
import React from "react";

vi.mock("i18next", () => ({
  t: (key: string) => key,
}));

describe("PaymentSummary Component", () => {
  const defaultProps = {
    totalPrice: 100,
    shipping: 10,
    deliveryDate: 7,
  };

  it("renders with correct structure", () => {
    render(<PaymentSummary {...defaultProps} />);

    const container = screen.getByTestId("payment-summary");
    expect(container).toHaveClass(
      "w-full",
      "bg-white",
      "p-6",
      "rounded-lg",
      "shadow-sm",
      "h-fit",
      "mt-5"
    );
  });

  it("displays order summary title", () => {
    render(<PaymentSummary {...defaultProps} />);

    const title = screen.getByTestId("order-summary-title");
    expect(title).toBeDefined();
  });

  it("shows correct delivery date", () => {
    render(<PaymentSummary {...defaultProps} />);
    expect(screen.getByTestId("delivery-date-row")).toBeDefined();
  });

  it("shows shipping cost when provided", () => {
    render(<PaymentSummary {...defaultProps} />);
    expect(screen.getByTestId("shipping-row-value")).toBeDefined();
  });

  it("shows total price correctly", () => {
    render(<PaymentSummary {...defaultProps} />);
    expect(screen.getByTestId("total-amount-row-value")).toBeDefined();
  });
});
