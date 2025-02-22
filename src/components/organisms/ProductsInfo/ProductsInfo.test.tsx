import { render, screen, fireEvent } from "@testing-library/react";
import ProductsInfo from "./ProductsInfo";
import { UserProvider } from "../../../context/UserContext";
import { expect, vi } from "vitest";
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

vi.mock("@/hooks/useLanguage", () => ({
  useLanguage: vi.fn(() => "en"),
}));

vi.mock("i18next", () => ({
  t: vi.fn((key) => key),
}));

const queryClient = new QueryClient();

describe("ProductsInfo Component", () => {
  const product = {
    title_en: "Product Title",
    title_ar: "عنوان المنتج",
    rich_des_en: "Rich description",
    rich_des_ar: "الوصف الغني",
    short_des_en: "Short description",
    short_des_ar: "وصف قصير",
  };

  const variants = {
    attributes: {
      Material: { values: [{ en: "Cotton", ar: "قطن" }] },
      Size: { values: [{ en: "Large", ar: "كبير" }] },
      Color: { values: [{ en: "Red", ar: "أحمر" }] },
    },
  };

  const currentVariant = [{ price: 20 }];
  const filters = { Material: "Cotton", Size: "Large", Color: "Red" };

  const onFilterChange = vi.fn();

  it("renders product title in the selected language", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <UserProvider>
          <ProductsInfo
            product={product}
            variants={variants}
            currentVariant={currentVariant}
            filters={filters}
            onFilterChange={onFilterChange}
          />
        </UserProvider>
      </QueryClientProvider>
    );

    expect(screen.getByText("Product Title")).toBeDefined();
  });

  it("renders product descriptions in the selected language", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <UserProvider>
          <ProductsInfo
            product={product}
            variants={variants}
            currentVariant={currentVariant}
            filters={filters}
            onFilterChange={onFilterChange}
          />
        </UserProvider>
      </QueryClientProvider>
    );

    expect(screen.getByText("Rich description")).toBeDefined();
    expect(screen.getByText("Short description")).toBeDefined();
  });

  it("displays attribute buttons correctly with the filter class", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <UserProvider>
          <ProductsInfo
            product={product}
            variants={variants}
            currentVariant={currentVariant}
            filters={filters}
            onFilterChange={onFilterChange}
          />
        </UserProvider>
      </QueryClientProvider>
    );

    const colorButton = screen.getByText("Red");
    expect(colorButton).toHaveClass("bg-main text-white font-bold");
  });

  it("calls onFilterChange when a filter button is clicked", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <UserProvider>
          <ProductsInfo
            product={product}
            variants={variants}
            currentVariant={currentVariant}
            filters={filters}
            onFilterChange={onFilterChange}
          />
        </UserProvider>
      </QueryClientProvider>
    );

    const colorButton = screen.getByText("Red");
    fireEvent.click(colorButton);
    expect(onFilterChange).toHaveBeenCalledWith("Color", "Red");
  });

  it("displays out of stock message when price is not available", () => {
    const currentVariantOutOfStock = [{ price: null }];
    render(
      <QueryClientProvider client={queryClient}>
        <UserProvider>
          <ProductsInfo
            product={product}
            variants={variants}
            currentVariant={currentVariantOutOfStock}
            filters={filters}
            onFilterChange={onFilterChange}
          />
        </UserProvider>
      </QueryClientProvider>
    );

    expect(screen.getByText("products.out_of_stock")).toBeDefined();
    expect(screen.getByRole("alert")).toHaveTextContent(
      "products.out_of_stock"
    );
  });
});
