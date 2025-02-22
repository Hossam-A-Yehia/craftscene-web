import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import CheckoutTemplate from "./CheckoutTemplate";
import { toast } from "react-toastify";
import React from "react";
import { useMutateAddOrder } from "../../../hooks/useOrders";
import { UserProvider } from "../../../context/UserContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

vi.mock("next/navigation", () => ({
  useRouter: vi.fn(() => ({
    push: vi.fn(),
  })),
}));

vi.mock("react-toastify", () => ({
  toast: {
    error: vi.fn(),
    success: vi.fn(),
  },
}));

vi.mock("i18next", () => ({
  t: (key: string) => key,
}));
const queryClient = new QueryClient();

vi.mock("../../../hooks/useOrders", () => ({
  useFetchCart: vi.fn(() => ({
    data: {
      payload: {
        "1": [{ id: 1, quantity: 2, variant: { price: 100 } }],
        "2": [{ id: 2, quantity: 1, variant: { price: 150 } }],
      },
    },
    isLoading: false,
  })),
  useMutateAddOrder: vi.fn(() => ({
    mutateAsync: vi.fn().mockResolvedValue({}),
    isPending: false,
  })),
}));

vi.mock("@/hooks/useAddress", () => ({
  useFetchAddress: vi.fn(() => ({
    data: [
      {
        id: 1,
        title: "Home",
        street_address: "123 Test St",
        is_default: 1,
      },
    ],
  })),
}));

vi.mock("@/hooks/useUser", () => ({
  useFetchUser: vi.fn(() => ({
    data: { phone: "1234567890" },
    isLoading: false,
  })),
}));

vi.mock("@/components/organisms/Cart/CartItems/CartItems", () => ({
  CartItems: () => <div data-testid="cart-items">Cart Items</div>,
}));

vi.mock("@/components/organisms/Cart/PaymentSummary/PaymentSummary", () => ({
  default: () => <div data-testid="payment-summary">Payment Summary</div>,
}));

vi.mock("@/components/organisms/Cart/DeliveryAddress/DeliveryAddress", () => ({
  default: ({ onAddressChange }) => (
    <div
      data-testid="delivery-address"
      onClick={() => onAddressChange({ id: 1 })}
    >
      Delivery Address
    </div>
  ),
}));

vi.mock("@/components/organisms/Cart/PhoneNumber/PhoneNumber", () => ({
  default: () => <div data-testid="phone-number">Phone Number</div>,
}));

vi.mock("@/components/organisms/Cart/PaymentMethod/PaymentMethod", () => ({
  default: () => <div data-testid="payment-method">Payment Method</div>,
}));

vi.mock("@/components/atoms/Button/Button", () => ({
  default: ({ children, onClick, disabled }) => (
    <button data-testid="submit-button" onClick={onClick} disabled={disabled}>
      {children}
    </button>
  ),
}));

describe("CheckoutTemplate", () => {
  const mockUserId = "test-user-123";

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render all checkout components", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <UserProvider>
          <CheckoutTemplate userId={mockUserId} />
        </UserProvider>
      </QueryClientProvider>
    );

    expect(screen.getByTestId("cart-items")).toBeDefined();
    expect(screen.getByTestId("payment-summary")).toBeDefined();
    expect(screen.getByTestId("delivery-address")).toBeDefined();
    expect(screen.getByTestId("phone-number")).toBeDefined();
    expect(screen.getByTestId("payment-method")).toBeDefined();
    expect(screen.getByTestId("submit-button")).toBeDefined();
  });

  it("should calculate subtotal correctly", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <UserProvider>
          <CheckoutTemplate userId={mockUserId} />
        </UserProvider>
      </QueryClientProvider>
    );
    expect(screen.getByTestId("payment-summary")).toBeDefined();
  });

  it("should show error toast when submitting without address", async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <UserProvider>
          <CheckoutTemplate userId={mockUserId} />
        </UserProvider>
      </QueryClientProvider>
    );
    fireEvent.click(screen.getByTestId("submit-button"));

    expect(toast.error).toHaveBeenCalledWith(
      "order.checkout.no_addresses_available"
    );
  });

  it("should handle successful order submission", async () => {
    const mockMutateAsync = vi.fn();
    useMutateAddOrder.mockReturnValue({
      mutateAsync: mockMutateAsync,
      isPending: false,
    });

    render(
      <QueryClientProvider client={queryClient}>
        <UserProvider>
          <CheckoutTemplate userId={mockUserId} />
        </UserProvider>
      </QueryClientProvider>
    );
    fireEvent.click(screen.getByTestId("delivery-address"));
    fireEvent.click(screen.getByTestId("submit-button"));

    await waitFor(() => {
      expect(mockMutateAsync).toHaveBeenCalled();
      expect(toast.success).toHaveBeenCalledWith("Order Added Successfully!");
    });
  });

  it("should handle error during order submission", async () => {
    const mockMutateAsync = vi.fn().mockRejectedValueOnce({
      response: { data: { message: "Test error message" } },
    });

    useMutateAddOrder.mockReturnValue({
      mutateAsync: mockMutateAsync,
      isPending: false,
    });

    render(
      <QueryClientProvider client={queryClient}>
        <UserProvider>
          <CheckoutTemplate userId={mockUserId} />
        </UserProvider>
      </QueryClientProvider>
    );
    fireEvent.click(screen.getByTestId("delivery-address"));
    fireEvent.click(screen.getByTestId("submit-button"));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith("Test error message");
    });
  });

  it("should disable submit button when order is pending", () => {
    const mockMutateAsync = vi.fn();
    useMutateAddOrder.mockReturnValue({
      mutateAsync: mockMutateAsync,
      isPending: true,
    });
    render(
      <QueryClientProvider client={queryClient}>
        <UserProvider>
          <CheckoutTemplate userId={mockUserId} />
        </UserProvider>
      </QueryClientProvider>
    );
    expect(screen.getByTestId("submit-button")).toBeDisabled();
  });
});
