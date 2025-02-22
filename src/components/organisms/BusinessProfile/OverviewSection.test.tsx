import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import OverviewSection from "./OverviewSection";
import React from "react";

vi.mock("@/components/molecules/Tabs/Tabs", () => ({
  default: ({ tabs, activeTab, onTabClick }: any) => (
    <div>
      {tabs.map((tab: string) => (
        <button
          key={tab}
          data-testid={`tab-${tab}`}
          onClick={() => onTabClick(tab)}
          className={tab === activeTab ? "active" : ""}
        >
          {tab}
        </button>
      ))}
    </div>
  ),
}));

vi.mock("../ServiceGrid/ServiceGrid", () => ({
  default: ({ services }: any) => (
    <div>Service Grid: {services.length} services</div>
  ),
}));

vi.mock("../ProjectGrid/ProjectGrid", () => ({
  default: ({ projects }: any) => (
    <div>Project Grid: {projects.length} projects</div>
  ),
}));

vi.mock("./About", () => ({
  default: ({ businessInfo }: any) => (
    <div>About: {businessInfo.business_name}</div>
  ),
}));

vi.mock("@/components/molecules/NoDate/NoDate", () => ({
  default: () => <div>No Data</div>,
}));

const mockBusinessInfo = {
  business_name: "Mock Business",
};

const mockServicesData = { payload: { data: ["Service 1", "Service 2"] } };
const mockProjectsData = { payload: ["Project 1", "Project 2"] };

describe("OverviewSection Component", () => {
  it("renders the correct default content (Services tab)", () => {
    render(
      <OverviewSection
        businessInfo={mockBusinessInfo}
        servicesData={mockServicesData}
        projectsData={mockProjectsData}
        branches={undefined}
      />
    );
    expect(screen.getByText("Service Grid: 2 services")).toBeDefined();
  });

  it("renders the NoDataSection when there are no services", () => {
    render(
      <OverviewSection
        businessInfo={mockBusinessInfo}
        servicesData={{ payload: { data: [] } }}
        projectsData={mockProjectsData}
        branches={undefined}
      />
    );
    expect(screen.getByText("No Data")).toBeDefined();
  });
});
