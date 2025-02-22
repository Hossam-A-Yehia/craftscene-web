import { render, screen, fireEvent } from "@testing-library/react";
import { expect, vi } from "vitest";
import "@testing-library/jest-dom";
import Tabs from "./Tabs";
import React from "react";

describe("Tabs Component", () => {
  const mockOnTabClick = vi.fn();

  const mockTabs = ["Tab 1", "Tab 2", "Tab 3"];
  const activeTab = "Tab 1";

  it("renders all tabs correctly", () => {
    render(
      <Tabs tabs={mockTabs} activeTab={activeTab} onTabClick={mockOnTabClick} />
    );
    mockTabs.forEach((tab) => {
      expect(screen.getByText(tab)).toBeInTheDocument();
    });
  });

  it("marks the active tab with correct styles", () => {
    render(
      <Tabs tabs={mockTabs} activeTab={activeTab} onTabClick={mockOnTabClick} />
    );
    const activeTabButton = screen.getByText(activeTab);
    expect(activeTabButton).toHaveClass(
      "border-b-2 border-main text-main font-bold"
    );
    mockTabs
      .filter((tab) => tab !== activeTab)
      .forEach((tab) => {
        expect(screen.getByText(tab)).toHaveClass("text-gray-500");
      });
  });

  it("calls onTabClick when a tab is clicked", () => {
    render(
      <Tabs tabs={mockTabs} activeTab={activeTab} onTabClick={mockOnTabClick} />
    );
    const secondTab = screen.getByText(mockTabs[1]);
    fireEvent.click(secondTab);
    expect(mockOnTabClick).toHaveBeenCalledWith(mockTabs[1]);
    expect(mockOnTabClick).toHaveBeenCalledTimes(1);
  });
});
