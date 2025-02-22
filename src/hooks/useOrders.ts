import {
  addOrder,
  addToCart,
  completeOrder,
  declineOrder,
  deleteBasket,
  editQuantity,
  getIncomingOrders,
  getMyCart,
  getMyOrders,
  getOrderForCustomer,
  getOrderForSupplier,
  acceptOrder,
} from "@/services/Orders";
import { useMutation, useQuery } from "@tanstack/react-query";

export function useFetchCart(userId: string) {
  return useQuery({
    queryKey: ["cart", userId],
    queryFn: () => getMyCart(userId),
  });
}
export function useFetchMyOrders(isIncomingOrders: boolean) {
  return useQuery({
    queryKey: ["orders"],
    queryFn: () => getMyOrders(),
    enabled: isIncomingOrders,
  });
}
export function useFetchOrderForCustomer(orderId: string) {
  return useQuery({
    queryKey: ["customer-order-details"],
    queryFn: () => getOrderForCustomer(orderId),
  });
}
export function useFetchOrderForSupplier(orderId: string) {
  return useQuery({
    queryKey: ["supplier-order-details"],
    queryFn: () => getOrderForSupplier(orderId),
  });
}
export const useMutateCompletedOrder = () => {
  return useMutation({
    mutationFn: completeOrder,
  });
};
export const useMutateDeclinedOrder = () => {
  return useMutation({
    mutationFn: declineOrder,
  });
};
export const useMutateAcceptOrder = () => {
  return useMutation({
    mutationFn: acceptOrder,
  });
};
export function useFetchIncomingOrders(isIncomingOrders: boolean) {
  return useQuery({
    queryKey: ["incoming-orders"],
    queryFn: () => getIncomingOrders(),
    enabled: isIncomingOrders,
  });
}
export const useMutateDeleteBasket = () => {
  return useMutation({
    mutationFn: deleteBasket,
  });
};
export const useMutateAddToCart = () => {
  return useMutation({
    mutationFn: addToCart,
  });
};

export const useMutateEditQuantity = () => {
  return useMutation({
    mutationFn: (data: { itemId: number; quantity: number }) =>
      editQuantity(data),
  });
};
export const useMutateAddOrder = () => {
  return useMutation({
    mutationFn: addOrder,
  });
};

