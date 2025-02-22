import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import BranchCard from "./BranchCard";
import { useMutateDeleteBranch } from "../../../hooks/useBranches";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import React from "react";

vi.mock("@tanstack/react-query", () => ({
  useQueryClient: vi.fn(),
}));
vi.mock("react-toastify", () => ({
  toast: {
    info: vi.fn(),
    error: vi.fn(),
  },
}));
vi.mock("react-icons/fa", () => ({
  FaTrash: () => <span data-testid="fa-trash-icon">Trash Icon</span>,
}));
vi.mock("@/hooks/useBranches", () => ({
  useMutateDeleteBranch: vi.fn(),
}));
vi.mock("i18next", () => ({
  t: (key: string) => key,
}));

describe("BranchCard", () => {
  const branchMock = {
    id: 1,
    branch_name: "Branch 1",
    city: { name_en: "City 1" },
    phone: "123-456-789",
  };
  const invalidateQueriesMock = vi.fn();
  const mutateAsyncMock = vi.fn();
  beforeEach(() => {
    (useQueryClient as any).mockReturnValue({
      invalidateQueries: invalidateQueriesMock,
    });
    (useMutateDeleteBranch as any).mockReturnValue({
      mutateAsync: mutateAsyncMock,
      isPending: false,
    });
  });
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("renders the component correctly", () => {
    render(<BranchCard branch={branchMock} />);
    expect(screen.getByText(branchMock.branch_name)).toBeDefined();
    expect(screen.getByText(branchMock.city.name_en)).toBeDefined();
    expect(screen.getByText(branchMock.phone)).toBeDefined();
    expect(screen.getByTestId("delete-branch-button")).toBeDefined();
  });

  it("handles branch deletion successfully", async () => {
    mutateAsyncMock.mockResolvedValueOnce(undefined);

    render(<BranchCard branch={branchMock} />);
    const deleteButton = screen.getByTestId("delete-branch-button");
    fireEvent.click(deleteButton);
    const confirmButton = screen.getByTestId("confirm");
    fireEvent.click(confirmButton);
    await waitFor(() => {
      expect(mutateAsyncMock).toHaveBeenCalledWith(branchMock.id);
      expect(invalidateQueriesMock).toHaveBeenCalledWith({
        queryKey: ["Branches"],
      });
      expect(toast.info).toHaveBeenCalledWith("Branch Deleted Successfully!");
    });
  });

  it("handles branch deletion failure", async () => {
    const errorMock = {
      response: {
        data: { message: "Error deleting branch" },
      },
    };
    mutateAsyncMock.mockRejectedValueOnce(errorMock);

    render(<BranchCard branch={branchMock} />);
    const deleteButton = screen.getByTestId("delete-branch-button");
    fireEvent.click(deleteButton);
    const confirmButton = screen.getByTestId("confirm");
    fireEvent.click(confirmButton);
    await waitFor(() => {
      expect(mutateAsyncMock).toHaveBeenCalledWith(branchMock.id);
      expect(toast.error).toHaveBeenCalledWith("Error deleting branch");
    });
  });

  it("disables delete button while mutation is pending", () => {
    (useMutateDeleteBranch as any).mockReturnValue({
      mutateAsync: mutateAsyncMock,
      isPending: true,
    });
    render(<BranchCard branch={branchMock} />);
    const deleteButton = screen.getByTestId("delete-branch-button");
    expect(deleteButton).toBeDisabled();
  });
});
