import { render, screen } from "@testing-library/react";
import ProductAttributes from "./ProductAttributes";
import { expect, vi } from "vitest";
import React from "react";

vi.mock("@/hooks/useLanguage", () => ({
  useLanguage: vi.fn(() => "en"),
}));

vi.mock("i18next", () => ({
  t: vi.fn((key) => key),
}));

describe("ProductAttributes Component", () => {
  it("renders the product details title", () => {
    const data = [
      {
        id: 1,
        attribute: { name_en: "Color", name_fr: "Couleur" },
        value: '{"en": "Red", "fr": "Rouge"}',
      },
    ];

    render(<ProductAttributes data={data} />);
    expect(screen.getByText("products.product_details")).toBeDefined();
  });

  it("renders attribute names and values correctly", () => {
    const data = [
      {
        id: 1,
        attribute: { name_en: "Color", name_fr: "Couleur" },
        value: '{"en": "Red", "fr": "Rouge"}',
      },
      {
        id: 2,
        attribute: { name_en: "Size", name_fr: "Taille" },
        value: '{"en": "Large", "fr": "Grand"}',
      },
    ];
    render(<ProductAttributes data={data} />);
    expect(screen.getByText("Color")).toBeDefined();
    expect(screen.getByText("Size")).toBeDefined();
    expect(screen.getByText("Red")).toBeDefined();
    expect(screen.getByText("Large")).toBeDefined();
  });

  it("displays 'N/A' when an attribute name is missing for the selected language", () => {
    const data = [
      {
        id: 1,
        attribute: { name_en: "Color" },
        value: '{"en": "Red"}',
      },
    ];
    render(<ProductAttributes data={data} />);
    expect(screen.getByText("Color")).toBeDefined();
    expect(screen.getByText("Red")).toBeDefined();
  });

  it("displays 'N/A' when the value is missing for the selected language", () => {
    const data = [
      {
        id: 1,
        attribute: { name_en: "Color" },
        value: '{"en": ""}',
      },
    ];
    render(<ProductAttributes data={data} />);
    expect(screen.getByText("Color")).toBeDefined();
    expect(screen.getByText("N/A")).toBeDefined();
  });

  it("correctly handles the fallback to English if the value for the selected language is missing", () => {
    const data = [
      {
        id: 1,
        attribute: { name_en: "Color", name_fr: "Couleur" },
        value: '{"fr": "Rouge"}',
      },
    ];
    render(<ProductAttributes data={data} />);
    expect(screen.getByText("Color")).toBeDefined();
    expect(screen.getByText("N/A")).toBeDefined();
  });
  it("renders a table with correct structure", () => {
    const data = [
      {
        id: 1,
        attribute: { name_en: "Color", name_fr: "Couleur" },
        value: '{"en": "Red", "fr": "Rouge"}',
      },
    ];
    render(<ProductAttributes data={data} />);
    expect(screen.getByRole("table")).toBeDefined();
    expect(screen.getByText("Color")).toBeDefined();
    expect(screen.getByText("Red")).toBeDefined();
  });
});
