import { render, fireEvent, screen } from "@testing-library/react";
import { SupplierSection } from "./SupplierSection";
import { expect, vi } from "vitest";
import React from "react";

vi.mock("../CartItem/CartItem", () => ({
  default: vi.fn(() => <div data-testid="cart-item" />),
}));

vi.mock("i18next", () => ({
  t: vi.fn((key) => key),
}));

describe("SupplierSection", () => {
  const mockItems = [
    {
      id: 1,
      variant: {
        product: {
          user: { username: "Supplier A" },
        },
      },
    },
    {
      id: 2,
      variant: {
        product: {
          user: { username: "Supplier A" },
        },
      },
    },
  ];

  it("renders the supplier section with correct information", () => {
    render(<SupplierSection items={mockItems} />);
    expect(screen.getByTestId("supplier-name")).toBeDefined();
    expect(screen.getByTestId("products-length")).toBeDefined();
    expect(screen.getAllByTestId("cart-item").length).toBe(mockItems.length);
  });

  it("renders a single product with correct singular text", () => {
    render(
      <SupplierSection
        items={[
          {
            id: 1,
            variant: {
              product: {
                user: { username: "Supplier A" },
              },
            },
          },
        ]}
      />
    );

    expect(screen.getByText("(1 order.cart.product)")).toBeDefined();
  });
  it("applies the correct class for the chevron icon", () => {
    render(<SupplierSection items={mockItems} />);
    const chevronIcon = screen.getByTestId("chevron-icon").querySelector("svg");
    expect(chevronIcon).toHaveClass("rotate-180");
    fireEvent.click(screen.getByText("Supplier A"));
    expect(chevronIcon).not.toHaveClass("rotate-180");
  });
});
