import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import DeliveryAddress from "./DeliveryAddress";
import { Address } from "../../../../types/Address";
import React from "react";
vi.mock("react-icons/fa", () => ({
  FaEdit: () => <div data-testid="edit-icon">Edit</div>,
}));

vi.mock("i18next", () => ({
  t: (key: string) => key,
}));

vi.mock("@/components/atoms/Text/Text", () => ({
  default: ({
    children,
    className,
  }: {
    children: React.ReactNode;
    className: string;
  }) => (
    <div data-testid="text-component" className={className}>
      {children}
    </div>
  ),
}));

vi.mock("../../Modals/AddressModal/AddressModal", () => ({
  default: ({ isOpen, onConfirm, onCancel }: any) =>
    isOpen ? (
      <div data-testid="address-modal">
        <button
          data-testid="modal-confirm"
          onClick={() => onConfirm(mockAddresses[1])}
        >
          Confirm
        </button>
        <button data-testid="modal-cancel" onClick={onCancel}>
          Cancel
        </button>
      </div>
    ) : null,
}));

const mockAddresses: Address[] = [
  {
    id: 1,
    street_address: "123 Main St",
    city: { name_en: "city1" },
    title: "Home",
    phone: null,
    special_instructions: "",
    is_default: 0,
  },
  {
    id: 2,
    street_address: "123 C St",
    city: { name_en: "city2" },
    title: "Work",
    phone: null,
    special_instructions: "",
    is_default: 0,
  },
];

describe("DeliveryAddress", () => {
  const userId = "test-user-123";
  const mockOnAddressChange = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render empty state when no addresses are provided", () => {
    render(
      <DeliveryAddress
        addresses={[]}
        userId={userId}
        onAddressChange={mockOnAddressChange}
      />
    );
    expect(
      screen.getByText("order.checkout.no_addresses_available")
    ).toBeDefined();
    expect(screen.getByText("order.checkout.delivery_address")).toBeDefined();
  });

  it("should render default address when addresses are provided", () => {
    render(
      <DeliveryAddress
        addresses={mockAddresses}
        userId={userId}
        onAddressChange={mockOnAddressChange}
      />
    );
    const textComponent = screen.getByTestId("text-component");
    expect(textComponent.textContent).toBeDefined();
  });

  it("should call onAddressChange with default address on mount", () => {
    render(
      <DeliveryAddress
        addresses={mockAddresses}
        userId={userId}
        onAddressChange={mockOnAddressChange}
      />
    );
    expect(mockOnAddressChange).toHaveBeenCalledWith(mockAddresses[0]);
  });

  it("should open modal when edit icon is clicked", () => {
    render(
      <DeliveryAddress
        addresses={mockAddresses}
        userId={userId}
        onAddressChange={mockOnAddressChange}
      />
    );
    const editIcon = screen.getByTestId("edit-icon");
    fireEvent.click(editIcon);
    expect(screen.getByTestId("address-modal")).toBeDefined();
  });

  it("should close modal when cancel is clicked", () => {
    render(
      <DeliveryAddress
        addresses={mockAddresses}
        userId={userId}
        onAddressChange={mockOnAddressChange}
      />
    );
    fireEvent.click(screen.getByTestId("edit-address-button"));
    expect(screen.getByTestId("address-modal")).toBeDefined();
    fireEvent.click(screen.getByTestId("modal-cancel"));
    expect(screen.queryByTestId("address-modal")).toBeNull();
  });

  it("should update selected address when new address is chosen", () => {
    render(
      <DeliveryAddress
        addresses={mockAddresses}
        userId={userId}
        onAddressChange={mockOnAddressChange}
      />
    );
    fireEvent.click(screen.getByTestId("edit-icon"));
    fireEvent.click(screen.getByTestId("modal-confirm"));
    expect(mockOnAddressChange).toHaveBeenCalledWith(mockAddresses[1]);
    expect(screen.queryByTestId("address-modal")).toBeNull();
  });

  it("should use first address as default when no default address is set", () => {
    const addressesWithNoDefault = mockAddresses.map((addr) => ({
      ...addr,
      is_default: 0,
    }));
    render(
      <DeliveryAddress
        addresses={addressesWithNoDefault}
        userId={userId}
        onAddressChange={mockOnAddressChange}
      />
    );
    const textComponent = screen.getByTestId("text-component");
    expect(textComponent).toBeDefined();
    expect(textComponent.textContent).toBe("Home, 123 Main St");
  });
});
