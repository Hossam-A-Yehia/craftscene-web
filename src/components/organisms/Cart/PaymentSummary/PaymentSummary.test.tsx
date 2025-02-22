import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import PaymentSummary from "./PaymentSummary";
import React from "react";

vi.mock("i18next", () => ({
  t: (key: string) => key,
}));

vi.mock("next/link", () => ({
  default: ({ children }: { children: React.ReactNode }) => children,
}));
vi.mock("@/components/atoms/Button/Button", () => ({
  default: ({
    children,
    dataTestid,
    disabled,
  }: {
    children: React.ReactNode;
    dataTestid?: string;
    disabled?: boolean;
  }) => (
    <button data-testid={dataTestid} disabled={disabled}>
      {children}
    </button>
  ),
}));
vi.mock("@/components/atoms/Text/Text", () => ({
  default: ({
    children,
    testId,
    className,
  }: {
    children: React.ReactNode;
    testId?: string;
    className?: string;
  }) => (
    <div data-testid={testId} className={className}>
      {children}
    </div>
  ),
}));

describe("PaymentSummary Component", () => {
  const defaultProps = {
    subTotal: 100,
    userId: "user123",
  };

  it("displays correct summary rows", () => {
    render(<PaymentSummary {...defaultProps} />);
    const subtotalRow = screen.getByTestId("subtotal-row");
    expect(subtotalRow).toBeDefined();

    const totalRow = screen.getByTestId("total-amount-row");
    expect(totalRow).toBeDefined();
  });

  it("shows checkout button when isCheckout is false", () => {
    render(<PaymentSummary {...defaultProps} isCheckout={false} />);
    const checkoutButton = screen.getByTestId("checkout-button");
    expect(checkoutButton).toBeDefined();
  });

  it("hides checkout button when isCheckout is true", () => {
    render(<PaymentSummary {...defaultProps} isCheckout={true} />);
    expect(screen.queryByTestId("checkout-button")).toBeNull();
  });

  it("disables checkout button when subtotal is 0", () => {
    render(<PaymentSummary {...defaultProps} subTotal={0} />);
    const checkoutButton = screen.getByTestId("checkout-button");
    expect(checkoutButton).toBeDisabled();
  });

  it("enables checkout button when subtotal is greater than 0", () => {
    render(<PaymentSummary {...defaultProps} subTotal={100} />);
    const checkoutButton = screen.getByTestId("checkout-button");
    expect(checkoutButton).not.toBeDisabled();
  });

  it("formats currency values correctly", () => {
    const subTotal = 1234.56;
    render(<PaymentSummary {...defaultProps} subTotal={subTotal} />);
    const subtotalValue = screen.getByTestId("subtotal-row-value");
    expect(subtotalValue).toHaveTextContent(`$${subTotal}`);
  });
});
