import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import AddressModalContent from "./AddressModalContent";
import { Address } from "../../../../types/Address";
import React from "react";

vi.mock("i18next", () => ({
  t: (key: string) => key,
}));

vi.mock("next/link", () => ({
  default: ({ children }: { children: React.ReactNode }) => children,
}));

vi.mock("@/components/atoms/Button/Button", () => ({
  default: ({
    children,
    variant,
    onClick,
    disabled,
    dataTestid,
  }: {
    children: React.ReactNode;
    variant?: string;
    onClick?: () => void;
    disabled?: boolean;
    dataTestid?: string;
  }) => (
    <button
      onClick={onClick}
      disabled={disabled}
      data-testid={dataTestid}
      data-variant={variant}
    >
      {children}
    </button>
  ),
}));

describe("AddressModalContent Component", () => {
  const mockAddresses: Address[] = [
    {
      id: 1,
      title: "Home",
      street_address: "123 Main St",
      city: { name_en: "New York" },
    },
    {
      id: 2,
      title: "Office",
      street_address: "456 Work Ave",
      city: { name_en: "Boston" },
    } as any,
  ];

  const defaultProps = {
    addresses: mockAddresses,
    onConfirm: vi.fn(),
    onCancel: vi.fn(),
    defaultAddress: mockAddresses[0],
    setSelectedAddressId: vi.fn(),
    selectedAddressId: null,
    userId: "user123",
  };

  it("displays address list title", () => {
    render(<AddressModalContent {...defaultProps} />);

    const title = screen.getByTestId("address-modal-title");
    expect(title).toBeDefined();
  });

  it("renders address cards correctly", () => {
    render(<AddressModalContent {...defaultProps} />);
    const addressCards = screen.getAllByTestId(/^address-card-/);
    expect(addressCards).toHaveLength(2);
    const firstCard = screen.getByTestId("address-card-1");
    expect(firstCard).toBeDefined();
    const secondCard = screen.getByTestId("address-card-2");
    expect(secondCard).toBeDefined();
  });

  it("handles address selection correctly", () => {
    render(<AddressModalContent {...defaultProps} />);

    const firstCard = screen.getByTestId("address-card-1");
    fireEvent.click(firstCard);

    expect(defaultProps.setSelectedAddressId).toHaveBeenCalledWith(1);
  });

  it("shows no addresses message when address list is empty", () => {
    render(<AddressModalContent {...defaultProps} addresses={[]} />);

    const noAddressesMessage = screen.getByTestId("no-addresses-message");
    expect(noAddressesMessage).toBeDefined();
  });

  it("renders action buttons correctly", () => {
    render(<AddressModalContent {...defaultProps} />);

    const cancelButton = screen.getByTestId("cancel-button");
    expect(cancelButton).toHaveAttribute("data-variant", "secondary");

    const confirmButton = screen.getByTestId("confirm");
    expect(confirmButton).toHaveAttribute("data-variant", "delete");
  });

  it("renders add address button with correct link", () => {
    render(<AddressModalContent {...defaultProps} />);
    const addAddressButton = screen.getByTestId("add-address-button");
    expect(addAddressButton).toHaveAttribute("data-variant", "main");
  });
});
