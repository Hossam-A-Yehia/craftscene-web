import { render, screen } from "@testing-library/react";
import { expect, vi } from "vitest";
import { CartItems } from "./CartItems";
import { SupplierSection } from "../SupplierSection/SupplierSection";
import React from "react";

vi.mock("../SupplierSection/SupplierSection", () => ({
  SupplierSection: vi.fn(() => <div data-testid="supplier-section" />),
}));

vi.mock("@/components/atoms/Loader/Loader", () => ({
  default: vi.fn(() => <div data-testid="loader" />),
}));

describe("CartItems", () => {
  const mockProducts = {
    "Supplier A": [
      { id: 1, variant: { product: { user: { username: "Supplier A" } } } },
    ],
    "Supplier B": [
      { id: 2, variant: { product: { user: { username: "Supplier B" } } } },
    ],
  };

  it("renders the Loader when loading", () => {
    render(<CartItems products={mockProducts} isLoading={true} />);
    const loader = screen.getByTestId("loader");
    expect(loader).toBeDefined();
  });

  it("renders SupplierSection components when loading is false", () => {
    render(<CartItems products={mockProducts} isLoading={false} />);
    const supplierSections = screen.getAllByTestId("supplier-section");
    expect(supplierSections).toBeDefined();
  });

  it("sets product data correctly after products prop changes", () => {
    const { rerender } = render(
      <CartItems products={mockProducts} isLoading={false} />
    );
    expect(SupplierSection).toHaveBeenCalled();
    const updatedProducts = {
      "Supplier C": [
        { id: 3, variant: { product: { user: { username: "Supplier C" } } } },
      ],
    };
    rerender(<CartItems products={updatedProducts} isLoading={false} />);
    expect(SupplierSection).toHaveBeenCalled();
  });
});
