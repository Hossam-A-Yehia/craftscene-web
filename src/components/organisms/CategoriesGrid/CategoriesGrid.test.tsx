import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import CategoriesGrid from "./CategoriesGrid";
import React from "react";

vi.mock("@/hooks/useLanguage", () => ({
  useLanguage: vi.fn(() => "en"),
}));

const mockCategories = [
  {
    id: "1",
    name_en: "Category 1",
    name_es: "Categoría 1",
    images: [{ url: "https://example.com/image1.jpg" }],
  },
  {
    id: "2",
    name_en: "Category 2",
    name_es: "Categoría 2",
    images: [{ url: "https://example.com/image2.jpg" }],
  },
];

describe("CategoriesGrid Component", () => {
  it("renders the grid correctly", () => {
    render(<CategoriesGrid categories={mockCategories} link={""} />);
    const gridElement = screen.getByRole("grid");
    expect(gridElement).toBeDefined();
  });

  it("renders correct category names", () => {
    render(<CategoriesGrid categories={mockCategories} link={""} />);
    const categoryName1 = screen.getByText(mockCategories[0].name_en);
    const categoryName2 = screen.getByText(mockCategories[1].name_en);
    expect(categoryName1).toBeDefined();
    expect(categoryName2).toBeDefined();
  });
});
