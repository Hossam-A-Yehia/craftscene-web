import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import AsksGrid from "./AsksGrid";
import React from "react";

vi.mock("@/hooks/useLanguage", () => ({
  useLanguage: () => "en",
}));

vi.mock("@/components/molecules/NoDate/NoData", () => ({
  default: () => <div data-testid="no-data-component">No Data</div>,
}));

vi.mock("@/components/molecules/AsksCard/AsksCard", () => ({
  default: ({ id, title, service, category }) => (
    <div data-testid={`ask-card-${id}`}>
      <span data-testid={`ask-title-${id}`}>{title}</span>
      <span data-testid={`ask-service-${id}`}>{service}</span>
      <span data-testid={`ask-category-${id}`}>{category}</span>
    </div>
  ),
}));

describe("Asks Component", () => {
  const mockAsks = [
    {
      id: "1",
      created_at: "2024-01-27",
      title: "Test Ask 1",
      service: {
        name_en: "Service 1",
        name_ar: "خدمة 1",
        category: {
          name_en: "Category 1",
          name_ar: "فئة 1",
        },
      },
    },
    {
      id: "2",
      created_at: "2024-01-28",
      title: "Test Ask 2",
      service: {
        name_en: "Service 2",
        name_ar: "خدمة 2",
        category: {
          name_en: "Category 2",
          name_ar: "فئة 2",
        },
      },
    },
  ];

  it("should render the ask grid container", () => {
    render(<AsksGrid data={[]} isLoading={false} />);
    expect(screen.getByTestId("asks-grid")).toBeDefined();
  });

  it("should render Ask cards when data is provided", () => {
    render(<AsksGrid data={mockAsks} isLoading={false} />);

    mockAsks.forEach((ask) => {
      expect(screen.getByTestId(`ask-card-${ask.id}`)).toBeDefined();
      expect(screen.getByTestId(`ask-title-${ask.id}`)).toHaveTextContent(
        ask.title
      );
      expect(screen.getByTestId(`ask-service-${ask.id}`)).toHaveTextContent(
        ask.service.name_en
      );
      expect(screen.getByTestId(`ask-category-${ask.id}`)).toHaveTextContent(
        ask.service.category.name_en
      );
    });
  });

  it("should not render NoData component when loading", () => {
    render(<AsksGrid data={[]} isLoading={true} />);
    expect(screen.queryByTestId("no-data")).toBeNull();
  });

  it("should render NoData component when no Asks and not loading", () => {
    render(<AsksGrid data={[]} isLoading={false} />);
    expect(screen.getByTestId("no-data")).toBeDefined();
  });

  it("should handle empty array properly", () => {
    render(<AsksGrid data={[]} isLoading={false} />);
    expect(screen.getByTestId("no-data")).toBeDefined();
    expect(screen.queryByTestId("ask-card-1")).toBeNull();
  });
});
