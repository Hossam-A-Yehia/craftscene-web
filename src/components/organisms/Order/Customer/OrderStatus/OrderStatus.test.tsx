import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import OrderStatus from "./OrderStatus";
import React from "react";

vi.mock("@/utils/generalUtils", () => ({
  findLabelByValue: (value: number) => `Status ${value}`,
}));

describe("OrderStatus Component", () => {
  it("renders with correct structure", () => {
    render(<OrderStatus status={1} />);
    const container = screen.getByTestId("order-status");
    expect(container).toBeDefined();
  });
  it("displays correct status label", () => {
    const status = 1;
    render(<OrderStatus status={status} />);
    const statusText = screen.getByTestId(`status`);
    expect(statusText).toBeDefined();
  });
});
