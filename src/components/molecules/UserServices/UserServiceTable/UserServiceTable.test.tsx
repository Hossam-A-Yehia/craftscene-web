import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import UserServiceTable from "./UserServiceTable";
import React from "react";

vi.mock("i18next", () => ({
  t: (key: string) => key,
}));

vi.mock("react-icons/fa", () => ({
  FaTrash: () => <div data-testid="fa-trash-icon" />,
}));

describe("UserServiceTable", () => {
  const mockUserServices = [
    {
      id: 1,
      service: {
        name_en: "Service 1",
        name_ar: "خدمة 1",
      },
    },
    {
      id: 2,
      service: {
        name_en: "Service 2",
      },
    },
  ];

  const mockOnDelete = vi.fn();

  const renderTable = (props = {}) => {
    const defaultProps = {
      userServices: mockUserServices,
      onDelete: mockOnDelete,
      isMutateDeleteLoading: false,
      ...props,
    };
    return render(<UserServiceTable {...defaultProps} />);
  };

  it("renders the table with correct headers", () => {
    renderTable();

    expect(screen.getByTestId("user-category-table")).toBeDefined();
    expect(screen.getByTestId("table-header-name-en")).toBeDefined();
    expect(screen.getByTestId("table-header-name-ar")).toBeDefined();
    expect(screen.getByTestId("table-header-delete")).toBeDefined();
  });

  it("renders correct number of rows with proper data", () => {
    renderTable();

    // Check if all rows are rendered
    expect(screen.getByTestId("table-row-1")).toBeDefined();
    expect(screen.getByTestId("table-row-2")).toBeDefined();

    // Check first row data
    expect(screen.getByTestId("row-1-name-en")).toHaveTextContent("Service 1");
    expect(screen.getByTestId("row-1-name-ar")).toHaveTextContent("خدمة 1");

    // Check second row data (fallback to name_en for name_ar)
    expect(screen.getByTestId("row-2-name-en")).toHaveTextContent("Service 2");
    expect(screen.getByTestId("row-2-name-ar")).toHaveTextContent("Service 2");
  });

  it("applies correct row background colors", () => {
    renderTable();

    const row1 = screen.getByTestId("table-row-1");
    const row2 = screen.getByTestId("table-row-2");

    expect(row1).toHaveClass("bg-white");
    expect(row2).toHaveClass("bg-gray-50");
  });

  it("calls onDelete with correct service ID when delete button is clicked", () => {
    renderTable();

    const deleteButton = screen.getByTestId("delete-button-1");
    fireEvent.click(deleteButton);

    expect(mockOnDelete).toHaveBeenCalledWith(1);
  });

  it("disables delete buttons when isMutateDeleteLoading is true", () => {
    renderTable({ isMutateDeleteLoading: true });

    const deleteButton1 = screen.getByTestId("delete-button-1");
    const deleteButton2 = screen.getByTestId("delete-button-2");

    expect(deleteButton1).toBeDisabled();
    expect(deleteButton2).toBeDisabled();
  });

  it("renders table with empty services array", () => {
    renderTable({ userServices: [] });

    expect(screen.getByTestId("user-category-table")).toBeDefined();
    expect(screen.queryByTestId("table-row-1")).toBeNull();
  });

  it("renders trash icon in delete button", () => {
    renderTable();

    const trashIcons = screen.getAllByTestId("fa-trash-icon");
    expect(trashIcons).toHaveLength(mockUserServices.length);
  });
});
