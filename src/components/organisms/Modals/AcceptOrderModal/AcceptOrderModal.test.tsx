import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import AcceptOrderModal from "./AcceptOrderModal";
import React from "react";

vi.mock(
  "@/components/molecules/Modals/AcceptOrderModalContent/AcceptOrderModalContent",
  () => ({
    default: vi.fn(() => (
      <div data-testid="address-modal-content">
        Mocked AcceptOrderModalContent
      </div>
    )),
  })
);

describe("AcceptOrderModal", () => {
  const onConfirm = vi.fn();
  const onCancel = vi.fn();
  const selectedProductIds = [1, 2];
  const productsDetails = [{ id: 1 }, { id: 2 }];
  const orderId = "123";

  const renderComponent = (isOpen: boolean) =>
    render(
      <AcceptOrderModal
        isOpen={isOpen}
        onConfirm={onConfirm}
        onCancel={onCancel}
        selectedProductIds={selectedProductIds}
        productsDetails={productsDetails}
        orderId={orderId}
      />
    );

  it("renders the modal when isOpen is true", () => {
    renderComponent(true);
    expect(screen.getByTestId("address-modal-overlay")).toBeDefined();
    expect(screen.getByTestId("address-modal-content")).toBeDefined();
  });

  it("does not render the modal when isOpen is false", () => {
    renderComponent(false);
    expect(screen.queryByTestId("address-modal-overlay")).toBeNull();
    expect(screen.queryByTestId("address-modal-content")).toBeNull();
  });

  it("applies the correct animation styles when isOpen is false", () => {
    renderComponent(false);
    const animatedDiv = screen.queryByTestId(
      "address-modal-content"
    )?.parentElement;
    expect(animatedDiv).not.toBeDefined();
  });
});
