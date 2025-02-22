import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { CartItems } from "./CartItems";
import React from "react";
vi.mock("@/components/atoms/Loader/Loader", () => ({
  default: () => <div data-testid="loader">Loading...</div>,
}));

vi.mock("@/components/molecules/NoDate/NoDate", () => ({
  default: () => <div data-testid="no-data">No Data</div>,
}));

vi.mock("@/hooks/useLanguage", () => ({
  useLanguage: vi.fn(() => "en"),
}));

vi.mock("i18next", () => ({
  t: vi.fn((key) => key),
}));

describe("CartItems", () => {
  const order = {
    order: {
      status: 1, // PENDING
    },
    products: [
      {
        order_product_id: 1,
        variant_images: [{ url: "image1.jpg", title: "Image 1" }],
        title_en: "Product 1",
        short_desc_en: "Description 1",
        price: 100,
        quantity: 2,
        product_status: 1, // SELECTED
      },
      {
        order_product_id: 2,
        variant_images: [{ url: "image2.jpg", title: "Image 2" }],
        title_en: "Product 2",
        short_desc_en: "Description 2",
        price: 200,
        quantity: 1,
        product_status: 0, // NOT SELECTED
      },
    ],
  };

  const checkedProducts = {
    1: true,
    2: false,
  };

  const onCheckboxChange = vi.fn();
  const onCheckAll = vi.fn();

  const renderComponent = (isLoading = false, products = order.products) =>
    render(
      <CartItems
        order={{ ...order, products }}
        isLoading={isLoading}
        checkedProducts={checkedProducts}
        onCheckboxChange={onCheckboxChange}
        onCheckAll={onCheckAll}
      />
    );

  it("renders the loader when isLoading is true", () => {
    renderComponent(true);
    expect(screen.getByTestId("loader")).toBeDefined();
  });
  it("renders the no data component when there are no products", () => {
    renderComponent(false, []);
    expect(screen.getByTestId("no-data")).toBeDefined();
  });

  it("renders the cart items correctly", () => {
    renderComponent();

    expect(screen.getByTestId("cart-items-container")).toBeDefined();
    expect(screen.getByTestId("product-header")).toBeDefined();
    expect(screen.getByTestId("check-all")).toBeDefined();
    expect(screen.getAllByTestId("product-details")).toHaveLength(2);
    expect(screen.getAllByTestId("product-price")).toBeDefined();
    expect(screen.getAllByTestId("product-quantity")).toBeDefined();
    expect(screen.getAllByTestId("product-status")).toBeDefined();
  });

  it("calls onCheckAll when the check-all checkbox is clicked", () => {
    renderComponent();
    fireEvent.click(screen.getByTestId("check-all"));
    expect(onCheckAll).toHaveBeenCalled();
  });

  it("calls onCheckboxChange when a product checkbox is clicked", () => {
    renderComponent();
    fireEvent.click(screen.getByTestId("checkbox-1"));
    expect(onCheckboxChange).toHaveBeenCalledWith(1);
  });
});
