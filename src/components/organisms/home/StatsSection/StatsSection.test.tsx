import { render, screen } from "@testing-library/react";
import { expect, vi } from "vitest";
import "@testing-library/jest-dom";
import React from "react";
import Stats from "./StatsSection";

vi.mock("i18next", () => ({
  t: vi.fn((key: string) => key),
}));

describe("Stats Component", () => {
  const mockStats = [
    { id: 1, value: "8K+", label: "home.stats.clients" },
    { id: 2, value: "698", label: "home.stats.Professionals" },
    { id: 3, value: "230", label: "home.stats.projects" },
    { id: 4, value: "8K+", label: "home.stats.products" },
  ];

  it("renders the stats container", () => {
    render(<Stats />);
    const container = screen.getByTestId("region");
    expect(container).toBeInTheDocument();
  });

  it("renders all stats cards", () => {
    render(<Stats />);
    const statValues = screen.getAllByText(/8K\+|698|230/);
    expect(statValues).toHaveLength(4);
  });

  it("renders correct stat labels", () => {
    render(<Stats />);
    mockStats.forEach((stat) => {
      const label = screen.getByText(stat.label);
      expect(label).toBeInTheDocument();
    });
  });

  it("renders correct stat values", () => {
    render(<Stats />);
    mockStats.forEach((stat) => {
      const valueElements = screen.getAllByText(stat.value);
      expect(valueElements.length).toBeGreaterThanOrEqual(1);
    });
  });
});
