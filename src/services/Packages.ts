import apiClient from "@/config/apiClient";
import packagesEndpoints from "@/config/endpoints/packagesEndpoints";

export const getPackages = async () => {
  const response = await  apiClient.get(
    `${packagesEndpoints.packages}`
  );
  return response.data.payload.data;
};
export const choosePackages = async (data: { package_id: number }) => {
  const response = await apiClient.post(`${packagesEndpoints.subscribe}`, data);
  return response.data;
};
