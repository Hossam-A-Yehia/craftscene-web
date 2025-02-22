import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import OrderSummary from "./OrderSummary";
import React from "react";

vi.mock("@/components/atoms/Text/Text", () => ({
  default: vi.fn(({ testId, className, children }) => (
    <div data-testid={testId} className={className}>
      {children}
    </div>
  )),
}));

vi.mock("@/components/molecules/SummaryRow/SummaryRow", () => ({
  default: vi.fn(({ testId, label, value }) => (
    <div data-testid={testId}>
      <span>{label}</span>
      <span>{value}</span>
    </div>
  )),
}));

vi.mock("i18next", () => ({
  t: vi.fn((key) => key),
}));

describe("OrderSummary", () => {
  const orderSummaryProps = {
    totalPrice: 100,
    shipping: 10,
  };

  const renderComponent = (props = orderSummaryProps) =>
    render(<OrderSummary {...props} />);

  it("renders the component correctly", () => {
    renderComponent();
    expect(screen.getByTestId("payment-summary")).toBeDefined();
  });

  it("displays the subtotal correctly", () => {
    renderComponent();
    expect(screen.getByTestId("subtotal-row")).toBeDefined();
  });

  it("displays the shipping cost correctly", () => {
    renderComponent();
    expect(screen.getByTestId("shipping-row")).toBeDefined();
  });

  it("displays the total price correctly", () => {
    renderComponent();
    expect(screen.getByTestId("total-amount-row")).toBeDefined();
  });

  it("handles missing shipping cost", () => {
    const propsWithoutShipping = { ...orderSummaryProps, shipping: undefined };
    renderComponent(propsWithoutShipping as any);
    expect(screen.getByText("__")).toBeDefined();
  });
});
