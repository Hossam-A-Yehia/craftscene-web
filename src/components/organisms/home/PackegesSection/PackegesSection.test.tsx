import { render, screen } from "@testing-library/react";
import { expect, vi } from "vitest";
import "@testing-library/jest-dom";
import PackegesSection from "./PackegesSection";
import React from "react";

vi.mock("i18next", () => ({
  t: (key) => key,
}));

vi.mock("@/hooks/useHome", () => ({
  useFetchPackeges: vi.fn(() => ({
    data: {
      payload: {
        data: [
          { id: 1, name_en: "Basic", desc_en: "Basic plan", price: 10 },
          { id: 2, name_en: "Standard", desc_en: "Standard plan", price: 20 },
          { id: 3, name_en: "Premium", desc_en: "Premium plan", price: 30 },
        ],
      },
    },
    isLoading: false,
    error: null,
  })),
}));

vi.mock("@/hooks/useLanguage", () => ({
  useLanguage: vi.fn(() => "en"),
}));

describe("PackegesSection", () => {
  it("renders the section and its elements correctly", () => {
    render(<PackegesSection />);

    const section = screen.getByTestId("packages-section");
    expect(section).toBeInTheDocument();

    const title = screen.getByTestId("shared-title");
    expect(title).toBeInTheDocument();

    const grid = screen.getByTestId("packages-grid");
    expect(grid).toBeInTheDocument();
  });
});
