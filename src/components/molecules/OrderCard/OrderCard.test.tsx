import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import OrderCard from "./OrderCard";
import React from "react";

vi.mock("i18next", () => ({
  t: (key: string) => key,
}));

vi.mock("next/link", () => ({
  default: ({
    children,
    href,
  }: {
    children: React.ReactNode;
    href: string;
  }) => (
    <a href={href} data-testid="order-link">
      {children}
    </a>
  ),
}));

describe("OrderCard Component", () => {
  const defaultProps = {
    id: 123,
    status: 1,
    total: 100,
    supplierName: "Test Supplier",
  };

  it("renders basic order information correctly", () => {
    render(<OrderCard {...defaultProps} />);

    expect(screen.getByTestId("order-id")).toBeDefined();
    expect(screen.getByTestId("order-total")).toBeDefined();
    expect(screen.getByTestId("supplier-name")).toBeDefined();
    expect(screen.getByTestId("order-status")).toBeDefined();
  });

  it("shows supplier name for outgoing orders", () => {
    render(<OrderCard {...defaultProps} isIncomingOrders={false} />);

    expect(screen.getByTestId("supplier-name")).toBeDefined();
    expect(screen.queryByTestId("client-name")).toBeNull();
  });

  it("shows client name for incoming orders", () => {
    render(
      <OrderCard
        {...defaultProps}
        isIncomingOrders={true}
        clientName="Test Client"
      />
    );

    expect(screen.getByTestId("client-name")).toBeDefined();
    expect(screen.queryByTestId("supplier-name")).toBeNull();
  });

  it("renders correct link for outgoing orders", () => {
    render(<OrderCard {...defaultProps} isIncomingOrders={false} />);

    const link = screen.getByTestId("order-link");
    expect(link).toHaveAttribute("href", "/orders/123");
  });

  it("renders correct link for incoming orders", () => {
    render(<OrderCard {...defaultProps} isIncomingOrders={true} />);

    const link = screen.getByTestId("order-link");
    expect(link).toHaveAttribute("href", "/incoming-orders/123");
  });

  it("displays view details link with arrow icon", () => {
    render(<OrderCard {...defaultProps} />);

    const link = screen.getByTestId("order-link");
    expect(link).toBeDefined();
    expect(screen.getByTestId("arrow-icon")).toBeDefined();
  });
});
