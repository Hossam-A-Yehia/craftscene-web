import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import OrderGrid from "./OrderGrid";
import { Order } from "../../../types/Orders";
import React from "react";

vi.mock("@/components/molecules/NoDate/NoDate", () => ({
  default: () => <div data-testid="no-data">No Data Component</div>,
}));

vi.mock("@/components/molecules/OrderCard/OrderCard", () => ({
  default: ({
    id,
    status,
    total,
    supplierName,
    clientName,
    isIncomingOrders,
  }: any) => (
    <div data-testid={`order-card-${id}`}>
      Order Card Component
      <span data-testid={`order-${id}-status`}>{status}</span>
      <span data-testid={`order-${id}-total`}>{total}</span>
      <span data-testid={`order-${id}-supplier`}>{supplierName}</span>
      <span data-testid={`order-${id}-client`}>{clientName}</span>
      <span data-testid={`order-${id}-type`}>
        {isIncomingOrders ? "incoming" : "outgoing"}
      </span>
    </div>
  ),
}));

describe("OrderGrid Component", () => {
  const mockOrders: Order[] = [
    {
      id: 1,
      status: 1,
      total_price: 100,
      supplier_name: "Supplier 1",
      client_name: "Client 1",
      user_id: 0,
      created_at: "",
      updated_at: "",
      address_id: 0,
      phone: "",
      delivery_status: 0,
      delivery_date: null,
      shipping: null,
    },
    {
      id: 2,
      status: 2,
      total_price: 200,
      supplier_name: "Supplier 2",
      client_name: "Client 2",
      user_id: 0,
      created_at: "",
      updated_at: "",
      address_id: 0,
      phone: "",
      delivery_status: 0,
      delivery_date: null,
      shipping: null,
    },
  ];

  it("renders multiple order cards when orders are provided", () => {
    render(<OrderGrid filteredOrders={mockOrders} isLoading={false} />);

    expect(screen.getByTestId("order-card-1")).toBeDefined();
    expect(screen.getByTestId("order-card-2")).toBeDefined();
    expect(screen.queryByTestId("no-data")).toBeNull();
  });

  it("renders NoData component when no orders and not loading", () => {
    render(<OrderGrid filteredOrders={[]} isLoading={false} />);

    expect(screen.getByTestId("no-data")).toBeDefined();
    expect(screen.queryByTestId("order-card-1")).toBeNull();
  });

  it("renders nothing when loading", () => {
    render(<OrderGrid filteredOrders={[]} isLoading={true} />);

    expect(screen.queryByTestId("no-data")).toBeNull();
    expect(screen.queryByTestId("order-card-1")).toBeNull();
  });
});
