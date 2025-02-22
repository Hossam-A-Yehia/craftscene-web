import { render, screen, fireEvent } from "@testing-library/react";
import UserCategoryTable from "./UserCategoryTable";
import { expect, vi } from "vitest";
import React from "react";
vi.mock("i18next", () => ({
  t: vi.fn((key) => key),
}));

vi.mock("react-icons/fa", () => ({
  FaTrash: () => <div data-testid="fa-trash-icon" />,
}));

describe("UserCategoryTable", () => {
  const mockUserCategories = [
    {
      category_id: 1,
      category: {
        name_en: "Category 1",
        name_ar: "الفئة 1",
      },
      id: 1,
    },
    {
      category_id: 2,
      category: {
        name_en: "Category 2",
      },
      id: 2,
    },
  ];

  const mockOnDelete = vi.fn();
  const mockIsMutateDeleteLoading = false;

  it("renders the table with user categories", () => {
    render(
      <UserCategoryTable
        userCategories={mockUserCategories}
        onDelete={mockOnDelete}
        isMutateDeleteLoading={mockIsMutateDeleteLoading}
      />
    );

    expect(screen.getByTestId("table-header-name-en")).toBeDefined();
    expect(screen.getByTestId("table-header-name-ar")).toBeDefined();
    expect(screen.getByTestId("table-header-delete")).toBeDefined();
    expect(screen.getByTestId("row-1-name-en")).toBeDefined();
    expect(screen.getByTestId("row-1-name-ar")).toBeDefined();

    expect(screen.getByTestId("row-2-name-en")).toBeDefined();
    expect(screen.getByTestId("row-2-name-ar")).toBeDefined();
  });

  it("calls onDelete with the correct categoryId when delete button is clicked", () => {
    render(
      <UserCategoryTable
        userCategories={mockUserCategories}
        onDelete={mockOnDelete}
        isMutateDeleteLoading={mockIsMutateDeleteLoading}
      />
    );

    const deleteButton = screen.getByTestId("delete-button-1");
    fireEvent.click(deleteButton);

    expect(mockOnDelete).toHaveBeenCalledWith(1);
  });

  it("applies correct background color for even and odd rows", () => {
    render(
      <UserCategoryTable
        userCategories={mockUserCategories}
        onDelete={mockOnDelete}
        isMutateDeleteLoading={mockIsMutateDeleteLoading}
      />
    );

    const row1 = screen.getByTestId("table-row-1");
    const row2 = screen.getByTestId("table-row-2");

    expect(row1).toHaveClass("bg-white");
    expect(row2).toHaveClass("bg-gray-50");
  });
});
