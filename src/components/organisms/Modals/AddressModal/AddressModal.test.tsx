import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import AddressModal from "./AddressModal";
import { Address } from "../../../../types/Address";
import React from "react";

vi.mock(
  "@/components/molecules/Modals/AddressModalContent/AddressModalContent",
  () => ({
    default: ({
      onConfirm,
      onCancel,
      selectedAddressId,
      setSelectedAddressId,
    }) => (
      <div data-testid="address-modal-content">
        <button
          data-testid="select-address-btn"
          onClick={() => setSelectedAddressId(2)}
        >
          Select Address
        </button>
        <button data-testid="confirm-btn" onClick={onConfirm}>
          Confirm
        </button>
        <button data-testid="cancel-btn" onClick={onCancel}>
          Cancel
        </button>
        <span data-testid="selected-address-id">{selectedAddressId}</span>
      </div>
    ),
  })
);

describe("AddressModal", () => {
  const mockAddresses: Address[] = [
    {
      id: 1,
      street_address: "123 Main St",
      city: { name_en: "city1" },
      title: "",
      phone: null,
      special_instructions: "",
      is_default: 0,
    },
    {
      id: 1,
      street_address: "123 c St",
      city: { name_en: "city2" },
      title: "",
      phone: null,
      special_instructions: "",
      is_default: 0,
    },
  ];

  const mockDefaultAddress: Address = mockAddresses[0];
  const mockUserId = "user123";
  const mockOnCancel = vi.fn();
  const mockOnConfirm = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should not render when isOpen is false", () => {
    render(
      <AddressModal
        isOpen={false}
        onCancel={mockOnCancel}
        onConfirm={mockOnConfirm}
        addresses={mockAddresses}
        defaultAddress={mockDefaultAddress}
        userId={mockUserId}
      />
    );

    expect(screen.queryByTestId("address-modal-content")).toBeNull();
  });

  it("should render when isOpen is true", () => {
    render(
      <AddressModal
        isOpen={true}
        onCancel={mockOnCancel}
        onConfirm={mockOnConfirm}
        addresses={mockAddresses}
        defaultAddress={mockDefaultAddress}
        userId={mockUserId}
      />
    );

    expect(screen.getByTestId("address-modal-content")).toBeDefined();
  });

  it("should initialize with default address ID", () => {
    render(
      <AddressModal
        isOpen={true}
        onCancel={mockOnCancel}
        onConfirm={mockOnConfirm}
        addresses={mockAddresses}
        defaultAddress={mockDefaultAddress}
        userId={mockUserId}
      />
    );

    const selectedIdElement = screen.getByTestId("selected-address-id");
    expect(selectedIdElement.textContent).toBe(
      mockDefaultAddress.id.toString()
    );
  });

  it("should update selected address when new address is selected", () => {
    render(
      <AddressModal
        isOpen={true}
        onCancel={mockOnCancel}
        onConfirm={mockOnConfirm}
        addresses={mockAddresses}
        defaultAddress={mockDefaultAddress}
        userId={mockUserId}
      />
    );

    fireEvent.click(screen.getByTestId("select-address-btn"));
    const selectedIdElement = screen.getByTestId("selected-address-id");
    expect(selectedIdElement.textContent).toBe("2");
  });

  it("should call onConfirm with null when no address is selected", () => {
    const noDefaultAddress = { ...mockDefaultAddress, id: null };
    render(
      <AddressModal
        isOpen={true}
        onCancel={mockOnCancel}
        onConfirm={mockOnConfirm}
        addresses={mockAddresses}
        defaultAddress={noDefaultAddress}
        userId={mockUserId}
      />
    );

    fireEvent.click(screen.getByTestId("confirm-btn"));
    expect(mockOnConfirm).toHaveBeenCalledWith(null);
  });

  it("should call onCancel when cancel button is clicked", () => {
    render(
      <AddressModal
        isOpen={true}
        onCancel={mockOnCancel}
        onConfirm={mockOnConfirm}
        addresses={mockAddresses}
        defaultAddress={mockDefaultAddress}
        userId={mockUserId}
      />
    );

    fireEvent.click(screen.getByTestId("cancel-btn"));
    expect(mockOnCancel).toHaveBeenCalled();
  });
});
