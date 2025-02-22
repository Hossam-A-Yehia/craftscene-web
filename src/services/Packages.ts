import apiClient from "@/config/apiClient";
import packagesEndpoints from "@/config/endpoints/packagesEndpoints";
import { PackageType } from "@/types/Packages";

export const getPackages = () => {
  return apiClient.get<null, { data: { payload: { data: PackageType[] } } }>(
    `${packagesEndpoints.packages}`
  );
};
