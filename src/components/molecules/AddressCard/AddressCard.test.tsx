import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { expect, vi } from "vitest";
import "@testing-library/jest-dom";
import AddressCard from "./AddressCard";
import React from "react";

vi.mock("react-toastify", () => ({
  toast: {
    info: vi.fn(),
    error: vi.fn(),
  },
}));

vi.mock("@/hooks/useAddress", () => ({
  useMutateDeleteIdea: vi.fn(() => ({
    mutateAsync: vi.fn(() => Promise.resolve()),
    isPending: false,
  })),
}));

vi.mock("@tanstack/react-query", () => ({
  useQueryClient: vi.fn(() => ({
    invalidateQueries: vi.fn(),
  })),
}));

vi.mock("i18next", () => ({
  t: (key: string) => key,
}));

describe("AddressCard Component", () => {
  const mockAddress = {
    id: 1,
    title: "Test Address",
    street_address: "123 Test St",
    city: { name_en: "Test City" },
    phone: "123-456-7890",
    special_instructions: "Leave at the front door",
  };
  it("renders the address information correctly", () => {
    render(<AddressCard address={mockAddress} />);

    expect(screen.getByText("Test Address")).toBeInTheDocument();
    expect(screen.getByText("123 Test St, Test City")).toBeInTheDocument();
    expect(screen.getByText("123-456-7890")).toBeInTheDocument();
    expect(screen.getByText("Leave at the front door")).toBeInTheDocument();
  });
  it("handles the delete action and shows success toast on successful deletion", async () => {
    render(<AddressCard address={mockAddress} />);
    const deleteButton = screen.getByTestId("delete-address-button");
    fireEvent.click(deleteButton);
    const confirmButton = screen.getByText("Confirm");
    fireEvent.click(confirmButton);
    await waitFor(() => {
      expect(
        screen.queryByText("Are you sure you want to delete this address?")
      ).not.toBeInTheDocument();
    });
  });

  it("handles the delete error and shows error toast on failure", async () => {
    vi.mock("@/hooks/useAddress", () => ({
      useMutateDeleteIdea: vi.fn(() => ({
        mutateAsync: vi.fn(() =>
          Promise.reject({
            response: { data: { message: "Error deleting address" } },
          })
        ),
        isPending: false,
      })),
    }));
    render(<AddressCard address={mockAddress} />);
    const deleteButton = screen.getByTestId("delete-address-button");
    fireEvent.click(deleteButton);
    const confirmButton = screen.getByText("Confirm");
    fireEvent.click(confirmButton);
    await waitFor(() => {
      expect(
        screen.queryByText("Are you sure you want to delete this address?")
      ).not.toBeInTheDocument();
    });
  });
});
