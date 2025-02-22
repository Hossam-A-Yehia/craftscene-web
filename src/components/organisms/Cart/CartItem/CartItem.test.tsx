import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { expect, vi } from "vitest";
import CartItem from "./CartItem";
import {
  useMutateDeleteBasket,
  useMutateEditQuantity,
} from "../../../../hooks/useOrders";
import { useQueryClient } from "@tanstack/react-query";
import React from "react";

vi.mock("@/hooks/useOrders");
vi.mock("@tanstack/react-query");

const mockCartItem = {
  id: 1,
  quantity: 2,
  variant: {
    images: [{ url: "image_url", title: "Image title" }],
    product: {
      title_en: "Test Product",
      short_des_en: "Short description",
    },
    price: 100,
  },
};

describe("CartItem Component", () => {
  const mockInvalidateQueries = vi.fn();
  const mockUpdateQuantity = vi.fn();
  const mockDeleteBasket = vi.fn();

  beforeEach(() => {
    useQueryClient.mockReturnValue({
      invalidateQueries: mockInvalidateQueries,
    });

    useMutateEditQuantity.mockReturnValue({
      mutateAsync: mockUpdateQuantity,
      isPending: false,
    });

    useMutateDeleteBasket.mockReturnValue({
      mutateAsync: mockDeleteBasket,
      isPending: false,
    });
  });

  it("renders the cart item details correctly", () => {
    render(<CartItem item={mockCartItem} />);

    expect(
      screen.getByText(mockCartItem.variant.product.title_en)
    ).toBeDefined();
    expect(
      screen.getByText(`$ ${mockCartItem.variant.price.toLocaleString()}`)
    ).toBeDefined();
  });

  it("updates quantity when plus or minus button is clicked", async () => {
    render(<CartItem item={mockCartItem} />);

    const minusButton = screen.getByTestId("minus");
    const plusButton = screen.getByTestId("plus");
    const quantityDisplay = screen.getByText(mockCartItem.quantity.toString());
    fireEvent.click(minusButton);
    await waitFor(() => {
      expect(mockUpdateQuantity).toHaveBeenCalledWith({
        itemId: mockCartItem.id,
        quantity: mockCartItem.quantity - 1,
      });
      expect(quantityDisplay).toHaveTextContent("1");
    });

    fireEvent.click(plusButton);
    await waitFor(() => {
      expect(mockUpdateQuantity).toHaveBeenCalledWith({
        itemId: mockCartItem.id,
        quantity: mockCartItem.quantity,
      });
      expect(quantityDisplay).toHaveTextContent("2");
    });
  });

  it("handles deleting the basket item", async () => {
    render(<CartItem item={mockCartItem} />);
    const deleteButton = screen.getByTestId("delete");
    mockDeleteBasket.mockResolvedValueOnce();
    fireEvent.click(deleteButton);
    await waitFor(() =>
      expect(mockDeleteBasket).toHaveBeenCalledWith(mockCartItem.id)
    );
    await waitFor(() =>
      expect(mockInvalidateQueries).toHaveBeenCalledWith({ queryKey: ["cart"] })
    );
  });

  it("prevents quantity update when in a pending state", async () => {
    useMutateEditQuantity.mockReturnValue({
      mutateAsync: mockUpdateQuantity,
      isPending: true,
    });

    render(<CartItem item={mockCartItem} />);

    const minusButton = screen.getByTestId("minus");
    const plusButton = screen.getByTestId("plus");

    expect(minusButton).toBeDisabled();
    expect(plusButton).toBeDisabled();
  });

  it("disables delete button while deleting", async () => {
    useMutateDeleteBasket.mockReturnValue({
      mutateAsync: mockDeleteBasket,
      isPending: true,
    });

    render(<CartItem item={mockCartItem} />);

    const deleteButton = screen.getByTestId("delete");
    expect(deleteButton).toBeDisabled();
  });
});
