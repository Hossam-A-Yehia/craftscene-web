import React from "react";
import { render, screen } from "@testing-library/react";
import ServiceGrid from "./ServiceGrid";
import "@testing-library/jest-dom";
import { expect, vi } from "vitest";
vi.mock("@/components/molecules/ServiceCard/ServiceCard", () => {
  return {
    __esModule: true,
    default: vi.fn(() => <div data-testid="service-card">Service Card</div>),
  };
});
describe("ServiceGrid Component", () => {
  it("renders the correct number of ServiceCard components", () => {
    const services = [
      { id: "1", name: "Service One" },
      { id: "2", name: "Service Two" },
      { id: "3", name: "Service Three" },
    ];
    render(<ServiceGrid services={services} />);
    expect(screen.getAllByTestId("service-card")).toHaveLength(services.length);
  });

  it("renders nothing when services are not provided", () => {
    render(<ServiceGrid services={null} />);
    expect(screen.queryByTestId("service-card")).not.toBeInTheDocument();
  });
});
