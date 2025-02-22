import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import AcceptOrderModalContent from "./AcceptOrderModalContent";
import React from "react";
import { toast } from "react-toastify";
import { useMutateAcceptOrder } from "../../../../hooks/useOrders";

vi.mock("@tanstack/react-query", () => ({
  useQueryClient: vi.fn(() => ({
    invalidateQueries: vi.fn(),
  })),
}));

vi.mock("@/hooks/useOrders", () => ({
  useMutateAcceptOrder: vi.fn(() => ({
    mutateAsync: vi.fn(() => Promise.resolve()),
    isPending: false,
  })),
}));

vi.mock("react-toastify", () => ({
  toast: {
    info: vi.fn(),
    error: vi.fn(),
  },
}));

vi.mock("i18next", () => ({
  t: vi.fn((key) => key),
}));

describe("AcceptOrderModalContent", () => {
  const onConfirm = vi.fn();
  const onCancel = vi.fn();
  const selectedProductIds = [1, 2];
  const productsDetails = [{ id: 1 }, { id: 2 }];
  const orderId = "123";

  const renderComponent = () =>
    render(
      <AcceptOrderModalContent
        onConfirm={onConfirm}
        onCancel={onCancel}
        selectedProductIds={selectedProductIds}
        productsDetails={productsDetails}
        orderId={orderId}
      />
    );

  it("renders the modal content correctly", () => {
    renderComponent();

    expect(screen.getByTestId("address-modal-content")).toBeDefined();
    expect(screen.getByTestId("shipping-order")).toBeDefined();
    expect(screen.getByTestId("delivery-date")).toBeDefined();
    expect(screen.getByTestId("cancel-button")).toBeDefined();
    expect(screen.getByTestId("confirm")).toBeDefined();
  });

  it("submits the form successfully", async () => {
    renderComponent();
    fireEvent.change(screen.getByTestId("shipping"), {
      target: { value: "Express" },
    });
    fireEvent.change(screen.getByTestId("deliveryDate"), {
      target: { value: "2023-12-31" },
    });
    fireEvent.click(screen.getByTestId("confirm"));
    await waitFor(() => {
      expect(onConfirm).toHaveBeenCalled();
    });
  });

  it("calls onCancel when cancel button is clicked", () => {
    renderComponent();
    fireEvent.click(screen.getByTestId("cancel-button"));
    expect(onCancel).toHaveBeenCalled();
  });

  it("disables the confirm button when form is submitting", async () => {
    renderComponent();
    fireEvent.change(screen.getByTestId("shipping"), {
      target: { value: "Express" },
    });
    fireEvent.change(screen.getByTestId("deliveryDate"), {
      target: { value: "2023-12-31" },
    });
    fireEvent.click(screen.getByTestId("confirm"));
    expect(screen.getByTestId("confirm")).toBeDisabled();
    await waitFor(() => {
      expect(screen.getByTestId("confirm")).not.toBeDisabled();
    });
  });

  it("shows an error message when form submission fails", async () => {
    const errorMessage = "An error occurred";
    vi.mocked(useMutateAcceptOrder as any).mockReturnValueOnce({
      mutateAsync: vi.fn(() =>
        Promise.reject({ response: { data: { message: errorMessage } } })
      ),
      isPending: false,
    });
    renderComponent();
    fireEvent.change(screen.getByTestId("shipping"), {
      target: { value: "Express" },
    });
    fireEvent.change(screen.getByTestId("deliveryDate"), {
      target: { value: "2023-12-31" },
    });
    fireEvent.click(screen.getByTestId("confirm"));
    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith(errorMessage);
    });
  });
});
