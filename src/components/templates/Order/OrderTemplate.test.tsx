import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import OrderTemplate from "./OrderTemplate";
import {
  useFetchOrderForCustomer,
  useMutateCompletedOrder,
  useMutateDeclinedOrder,
} from "../../../hooks/useOrders";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import React from "react";

vi.mock("@/hooks/useOrders");
vi.mock("@tanstack/react-query");
vi.mock("react-toastify");

const mockUseFetchOrderForCustomer = useFetchOrderForCustomer as any;
const mockUseMutateCompletedOrder = useMutateCompletedOrder as any;
const mockUseMutateDeclinedOrder = useMutateDeclinedOrder as any;
const mockUseQueryClient = useQueryClient as any;
const mockToast = toast as any;

describe("OrderTemplate", () => {
  const orderId = "123";
  const mockOrder = {
    product: [],
    order: {
      status: 2, // PARTIALY_ACCEPTED
      delivery_date: "2023-10-01",
      shipping: 10,
      total_price: 100,
    },
    delivery_address: "123 Main St, Springfield, IL, 62701",
  };

  beforeEach(() => {
    mockUseFetchOrderForCustomer.mockReturnValue({
      data: mockOrder,
      isLoading: false,
    });
    mockUseMutateCompletedOrder.mockReturnValue({
      mutateAsync: vi.fn().mockResolvedValue({}),
      isPending: false,
    });
    mockUseMutateDeclinedOrder.mockReturnValue({
      mutateAsync: vi.fn().mockResolvedValue({}),
      isPending: false,
    });
    mockUseQueryClient.mockReturnValue({
      invalidateQueries: vi.fn(),
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("renders the component with order details", () => {
    render(<OrderTemplate orderId={orderId} />);

    expect(screen.getByTestId("title")).toBeDefined();
    expect(screen.getByTestId("cart-items")).toBeDefined();
    expect(screen.getByTestId("order-status")).toBeDefined();
    expect(screen.getByTestId("delivery-address-container")).toBeDefined();
    expect(screen.getByTestId("payment-summary")).toBeDefined();
  });

  it("displays the accept and decline buttons when order status is PARTIALY_ACCEPTED", () => {
    render(<OrderTemplate orderId={orderId} />);

    expect(screen.getByTestId("accept-button")).toBeDefined();
    expect(screen.getByTestId("decline-button")).toBeDefined();
  });

  it("calls handleComplatedOrder when accept button is clicked", async () => {
    render(<OrderTemplate orderId={orderId} />);
    const acceptButton = screen.getByTestId("accept-button");
    await userEvent.click(acceptButton);
    await waitFor(() => {
      expect(mockUseMutateCompletedOrder().mutateAsync).toHaveBeenCalledWith(
        orderId
      );
      expect(mockUseQueryClient().invalidateQueries).toHaveBeenCalledWith({
        queryKey: ["customer-order-details"],
      });
      expect(mockToast.info).toHaveBeenCalled();
    });
  });

  it("calls handleDeclinedOrder when decline button is clicked", async () => {
    render(<OrderTemplate orderId={orderId} />);
    const declineButton = screen.getByTestId("decline-button");
    await userEvent.click(declineButton);
    await waitFor(() => {
      expect(mockUseMutateDeclinedOrder().mutateAsync).toHaveBeenCalledWith(
        orderId
      );
      expect(mockUseQueryClient().invalidateQueries).toHaveBeenCalledWith({
        queryKey: ["customer-order-details"],
      });
      expect(mockToast.info).toHaveBeenCalled();
    });
  });

  it("disables buttons when mutation is pending", () => {
    mockUseMutateCompletedOrder.mockReturnValue({
      mutateAsync: vi.fn(),
      isPending: true,
    });
    mockUseMutateDeclinedOrder.mockReturnValue({
      mutateAsync: vi.fn(),
      isPending: true,
    });
    render(<OrderTemplate orderId={orderId} />);
    expect(screen.getByTestId("accept-button")).toBeDisabled();
    expect(screen.getByTestId("decline-button")).toBeDisabled();
  });

  it("shows loading state when order data is loading", () => {
    mockUseFetchOrderForCustomer.mockReturnValue({
      data: null,
      isLoading: true,
    });
    render(<OrderTemplate orderId={orderId} />);
    expect(screen.getByTestId("loader-container")).toBeDefined();
  });

  it("displays an error toast when handleComplatedOrder fails", async () => {
    const errorMessage = "Failed to complete order";
    mockUseMutateCompletedOrder.mockReturnValue({
      mutateAsync: vi
        .fn()
        .mockRejectedValue({ response: { data: { message: errorMessage } } }),
      isPending: false,
    });
    render(<OrderTemplate orderId={orderId} />);
    const acceptButton = screen.getByTestId("accept-button");
    await userEvent.click(acceptButton);
    await waitFor(() => {
      expect(mockToast.error).toHaveBeenCalledWith(errorMessage);
    });
  });

  it("displays an error toast when handleDeclinedOrder fails", async () => {
    const errorMessage = "Failed to decline order";
    mockUseMutateDeclinedOrder.mockReturnValue({
      mutateAsync: vi
        .fn()
        .mockRejectedValue({ response: { data: { message: errorMessage } } }),
      isPending: false,
    });
    render(<OrderTemplate orderId={orderId} />);
    const declineButton = screen.getByTestId("decline-button");
    await userEvent.click(declineButton);
    await waitFor(() => {
      expect(mockToast.error).toHaveBeenCalledWith(errorMessage);
    });
  });
});
