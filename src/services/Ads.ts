import apiClient from "@/config/apiClient";
import adsEndpoints from "@/config/endpoints/adsEndpoints";

export const getAds = async () => {
  const response = await apiClient.get(`${adsEndpoints.ads}`);
  return response.data;
};
