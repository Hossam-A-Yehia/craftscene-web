import apiClient from "@/config/apiClient";
import completeProfileEndpoints from "@/config/endpoints/completeProfileEndpoints";
import {
  BusinessUserDetailsCategoriesStore,
  BusinessUserDetailsServicesStore,
  PhoneEmailExistenceCheckData,
  PhoneEmailExistenceCheckResponse,
  SuggestedServicesStore,
} from "@/types/CompleteProfile";

export const CheckPhoneEmailExistence = (
  data: PhoneEmailExistenceCheckData
) => {
  return apiClient.post<null, PhoneEmailExistenceCheckResponse>(
    completeProfileEndpoints.checkExistence,
    data
  );
};

export const storeBusinessUserDetails = (data: FormData) => {
  return apiClient.post(completeProfileEndpoints.businessUserDetails, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const storeBusinessUserDetailsCategories = (
  data: BusinessUserDetailsCategoriesStore[]
) => {
  return apiClient.post(
    completeProfileEndpoints.businessUserDetailsCategories,
    data
  );
};

export const storeBusinessUserDetailsServices = (data: {
  services: BusinessUserDetailsServicesStore[];
}) => {
  return apiClient.post(
    completeProfileEndpoints.businessUserDetailsServices,
    data
  );
};

export const storeSuggestedServices = (data: SuggestedServicesStore) => {
  return apiClient.post(completeProfileEndpoints.suggestedServices, data);
};
