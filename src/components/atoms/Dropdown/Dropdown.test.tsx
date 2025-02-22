import { render, screen, fireEvent } from "@testing-library/react";
import { expect } from "vitest";
import "@testing-library/jest-dom";
import React from "react";
import Dropdown from "./Dropdown";

describe("Dropdown Component", () => {
  const items = [
    { label: "Item 1", href: "#item1" },
    { label: "Item 2", href: "#item2" },
    { label: "Item 3", href: "#item3" },
  ];

  it("renders the dropdown label", () => {
    render(<Dropdown label="Menu" items={items} />);
    expect(screen.getByText("Menu")).toBeInTheDocument();
  });

  it("opens the dropdown when the button is clicked", () => {
    render(<Dropdown label="Menu" items={items} />);
    const button = screen.getByText("Menu");
    fireEvent.click(button);
    items.forEach((item) => {
      expect(screen.getByText(item.label)).toBeInTheDocument();
    });
  });

  it("closes the dropdown when an item is clicked", () => {
    render(<Dropdown label="Menu" items={items} />);
    const button = screen.getByText("Menu");
    fireEvent.click(button);
    const item = screen.getByText("Item 1");
    fireEvent.click(item);
    expect(screen.queryByText("Item 1")).not.toBeInTheDocument();
  });

  it("closes the dropdown when clicking outside", () => {
    render(
      <>
        <Dropdown label="Menu" items={items} />
        <button>Outside Button</button>
      </>
    );
    const button = screen.getByText("Menu");
    fireEvent.click(button);
    fireEvent.mouseDown(screen.getByText("Outside Button"));
    expect(screen.queryByText("Item 1")).not.toBeInTheDocument();
  });

  it("does not render dropdown items by default", () => {
    render(<Dropdown label="Menu" items={items} />);
    items.forEach((item) => {
      expect(screen.queryByText(item.label)).not.toBeInTheDocument();
    });
  });

  it("renders the correct number of dropdown items", () => {
    render(<Dropdown label="Menu" items={items} />);
    const button = screen.getByText("Menu");
    fireEvent.click(button);
    expect(screen.getAllByRole("link")).toHaveLength(items.length);
  });

  it("assigns correct href attributes to dropdown items", () => {
    render(<Dropdown label="Menu" items={items} />);
    const button = screen.getByText("Menu");
    fireEvent.click(button);
    const links = screen.getAllByRole("link");
    links.forEach((link, index) => {
      expect(link).toHaveAttribute("href", items[index].href);
    });
  });

  it("handles dynamic item updates correctly", () => {
    const updatedItems = [
      { label: "Updated 1", href: "#updated1" },
      { label: "Updated 2", href: "#updated2" },
    ];
    const { rerender } = render(<Dropdown label="Menu" items={items} />);
    rerender(<Dropdown label="Menu" items={updatedItems} />);
    const button = screen.getByText("Menu");
    fireEvent.click(button);
    updatedItems.forEach((item) => {
      expect(screen.getByText(item.label)).toBeInTheDocument();
    });
  });
});
