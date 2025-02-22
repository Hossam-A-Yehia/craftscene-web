import apiClient from "@/config/apiClient";
import ordersEndpoints from "@/config/endpoints/ordersEndpoints";

export const getMyCart = async (userId: string) => {
  const response = await apiClient.get(
    `${ordersEndpoints.cart}/${userId}/basket`
  );
  return response?.data;
};
export const getIncomingOrders = async () => {
  const response = await apiClient.get(`${ordersEndpoints.incomingOrders}`);
  return response?.data.payload.data;
};

export const getMyOrders = async () => {
  const response = await apiClient.get(`${ordersEndpoints.orders}`);
  return response?.data.payload.data;
};
export const getOrderForCustomer = async (orderId: string) => {
  const response = await apiClient.get(
    `${ordersEndpoints.orderForCustomer}/${orderId}/details`
  );
  return response?.data.payload;
};
export const getOrderForSupplier = async (orderId: string) => {
  const response = await apiClient.get(
    `${ordersEndpoints.orderForSupplier}/${orderId}/details`
  );
  return response?.data.payload;
};
export const completeOrder = async (orderId: string) => {
  const response = await apiClient.put(
    `${ordersEndpoints.completeTheOrder}/${orderId}/complete`
  );
  return response?.data.payload;
};
export const declineOrder = async (orderId: string) => {
  const response = await apiClient.put(
    `${ordersEndpoints.completeTheOrder}/${orderId}/decline`
  );
  return response?.data.payload;
};
export const acceptOrder = async (data: any) => {
  const { orderId } = data;
  const endpoint = !data.items ? "/total-accept" : "/partial-accept";

  const response = await apiClient.put(
    `${ordersEndpoints.totalAcceptOrder}/${orderId}${endpoint}`,
    data
  );
  return response?.data.payload;
};

export const addToCart = async (data: any) => {
  const response = await apiClient.post(`${ordersEndpoints.add}`, data);
  return response.data;
};

export const deleteBasket = async (id: number) => {
  const response = await apiClient.delete(`${ordersEndpoints.delete}/${id}`);
  return response.data;
};

export const editQuantity = async ({
  itemId,
  quantity,
}: {
  itemId: number;
  quantity: number;
}) => {
  const response = await apiClient.put(`${ordersEndpoints.update}/${itemId}`, {
    quantity,
  });
  return response.data;
};
export const addOrder = async (data: any) => {
  const response = await apiClient.post(`${ordersEndpoints.addOrder}`, data);
  return response.data;
};

