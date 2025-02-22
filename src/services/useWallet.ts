import apiClient from "@/config/apiClient";
import walletEndpoints from "@/config/endpoints/walletEndpoints";

export const getWallet = async (userId: string) => {
  const response = await apiClient.get(
    `${walletEndpoints.wallet}/${userId}/wallet`
  );
  return response.data.payload;
};
