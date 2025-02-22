import { render, screen } from "@testing-library/react";
import { expect, vi } from "vitest";
import "@testing-library/jest-dom";
import ServiceList from "./ServiceList";
import React from "react";

vi.mock("i18next", () => ({
  t: (key: string) => key,
}));

describe("ServiceList Component", () => {
  it("renders the service list correctly", () => {
    render(<ServiceList />);

    const serviceList = screen.getByTestId("service-list");
    expect(serviceList).toBeInTheDocument();

    const serviceItems = screen.getAllByTestId("service-item");
    expect(serviceItems).toHaveLength(4);
  });

  it("renders the services correctly", () => {
    render(<ServiceList />);

    const serviceTexts = [
      "home.about.srv1",
      "home.about.srv2",
      "home.about.srv3",
      "home.about.srv4",
    ];

    serviceTexts.forEach((serviceText) => {
      const serviceItem = screen.getByText(serviceText);
      expect(serviceItem).toBeInTheDocument();
    });
  });

  it("applies the correct icon class", () => {
    render(<ServiceList />);

    const icons = screen.getAllByTestId("service-icon");
    icons.forEach((icon) => {
      expect(icon).toHaveClass("text-main");
      expect(icon).toHaveClass("text-lg");
    });
  });

  it("applies the correct styles to the service list", () => {
    render(<ServiceList />);

    const serviceList = screen.getByTestId("service-list");
    expect(serviceList).toHaveClass("grid");
    expect(serviceList).toHaveClass("grid-cols-2");
    expect(serviceList).toHaveClass("gap-4");
    expect(serviceList).toHaveClass("mt-7");
  });

  it("renders the correct number of list items", () => {
    render(<ServiceList />);

    const serviceItems = screen.getAllByTestId("service-item");
    expect(serviceItems.length).toBe(4);
  });
});
