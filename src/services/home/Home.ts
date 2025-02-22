import apiClient from "@/config/apiClient";
import homeEndpoints from "@/config/endpoints/homeEndpoints ";
const headers = {
  paginationItems: "15",
};
export const IdeasHome = async () => {
  const response = await apiClient.get(homeEndpoints.ideas, {
    headers,
  });
  return response.data;
};
export const Products = async () => {
  const response = await apiClient.get(homeEndpoints.products, {
    headers,
  });
  return response.data;
};
export const Packeges = async () => {
  const response = await apiClient.get(homeEndpoints.packages);
  return response.data;
};
export const Categories = async () => {
  const response = await apiClient.get(homeEndpoints.categories);
  return response.data;
};
