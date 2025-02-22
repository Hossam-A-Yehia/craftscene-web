import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import OrdersTemplate from "./OrdersTemplate";
import React from "react";
import {
  useFetchIncomingOrders,
  useFetchMyOrders,
} from "../../../hooks/useOrders";

vi.mock("i18next", () => ({
  t: (key: string) => key,
}));

vi.mock("@/hooks/useOrders", () => ({
  useFetchMyOrders: vi.fn().mockReturnValue({
    data: [
      { id: 1, status: 1, total_price: 100, supplier_name: "Supplier 1" },
      { id: 2, status: 2, total_price: 200, supplier_name: "Supplier 2" },
    ],
    isLoading: false,
  }),
  useFetchIncomingOrders: vi.fn().mockReturnValue({
    data: [
      { id: 3, status: 1, total_price: 300, client_name: "Client 1" },
      { id: 4, status: 2, total_price: 400, client_name: "Client 2" },
    ],
    isLoading: false,
  }),
}));

vi.mock("@/components/atoms/Loader/Loader", () => ({
  default: () => <div data-testid="loader">Loading...</div>,
}));

vi.mock("@/components/organisms/OrderGrid/OrderGrid", () => ({
  default: ({ filteredOrders, isLoading, isIncomingOrders }: any) => (
    <div data-testid="order-grid">
      <span data-testid="orders-count">{filteredOrders.length}</span>
      <span data-testid="loading-state">{isLoading.toString()}</span>
      <span data-testid="incoming-state">{isIncomingOrders?.toString()}</span>
    </div>
  ),
}));

describe("OrdersTemplate Component", () => {
  it("renders title correctly", () => {
    render(<OrdersTemplate isIncomingOrders={true} />);
    expect(screen.getByTestId("title")).toBeDefined();
  });

  it("renders status filter buttons", () => {
    render(<OrdersTemplate isIncomingOrders={false} />);
    const filterButtons = screen.getAllByRole("button");
    expect(filterButtons.length).toBeGreaterThan(0);
  });

  it("updates active filter when clicking status buttons", () => {
    render(<OrdersTemplate isIncomingOrders={false} />);
    const filterButtons = screen.getAllByRole("button");
    fireEvent.click(filterButtons[1]);
    expect(filterButtons[1]).toHaveClass("bg-orange-500", "text-white");
    expect(filterButtons[0]).toHaveClass("bg-gray-200", "text-gray-600");
  });

  it("shows loader when loading", () => {
    vi.mocked(useFetchMyOrders).mockReturnValueOnce({
      data: [],
      isLoading: true,
    } as any);

    render(<OrdersTemplate isIncomingOrders={false} />);
    expect(screen.getByTestId("loader")).toBeDefined();
  });

  it("filters orders based on selected status", () => {
    render(<OrdersTemplate isIncomingOrders={false} />);
    const filterButtons = screen.getAllByRole("button");
    expect(screen.getByTestId("orders-count")).toHaveTextContent("2");
    fireEvent.click(filterButtons[1]);
    expect(screen.getByTestId("orders-count")).toHaveTextContent("1");
  });

  it("passes correct props to OrderGrid", () => {
    render(<OrdersTemplate isIncomingOrders={true} />);

    const orderGrid = screen.getByTestId("order-grid");
    expect(orderGrid).toBeDefined();
    expect(screen.getByTestId("loading-state")).toHaveTextContent("false");
    expect(screen.getByTestId("incoming-state")).toHaveTextContent("true");
  });

  it("handles loading state for incoming orders", () => {
    vi.mocked(useFetchIncomingOrders).mockReturnValueOnce({
      data: [],
      isLoading: true,
    } as any);
    render(<OrdersTemplate isIncomingOrders={true} />);
    expect(screen.getByTestId("loader")).toBeDefined();
  });

  it("displays description text", () => {
    render(<OrdersTemplate isIncomingOrders={false} />);
    expect(screen.getByTestId("desc")).toBeDefined();
  });
});
