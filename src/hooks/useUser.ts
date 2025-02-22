import {
  editInterests,
  editUser,
  fetchBusinessUsers,
  fetchProfessionals,
  FiltersProfessionals,
  businessUsers,
  userServices,
  mutateEditBusinessUser,
  getUser,
} from "@/services/user/user";
import { useMutation, useQuery } from "@tanstack/react-query";

export function useFetchProfessionals(
  params: Record<string, any>,
  isEnabled: boolean
) {
  return useQuery({
    queryKey: ["professionals", params],
    queryFn: () => fetchProfessionals(params),
    enabled: isEnabled,
  });
}
export function useFetchSuppliers(userTypes: number[]) {
  return useQuery({
    queryKey: ["professionals"],
    queryFn: () => businessUsers(userTypes),
  });
}
export function useFetchUser() {
  return useQuery({
    queryKey: ["user"],
    queryFn: getUser,
  });
}
export function useFetchFilterProfessionals(
  params: Record<string, any>,
  isEnabled: boolean
) {
  return useQuery({
    queryKey: ["FilterProfessionals", params],
    queryFn: () => FiltersProfessionals(params),
    enabled: isEnabled,
  });
}

export function useFetchbusinessUsers(
  params: Record<string, any>,
  isEnabled: boolean
) {
  return useQuery({
    queryKey: ["businessUser", params],
    queryFn: () => fetchBusinessUsers(params),
    enabled: isEnabled,
  });
}
export const useMutateEditUser = () => {
  return useMutation({
    mutationFn: editUser,
  });
};

export const useMutateEditInterests = () => {
  return useMutation({
    mutationFn: editInterests,
  });
};

export function useFetchUserServices(userId: string) {
  return useQuery({
    queryKey: ["user-services", +userId],
    queryFn: () => userServices(userId),
    enabled: Boolean(userId),
  });
}

export function useMutateEditBusinessUser() {
  return useMutation({
    mutationFn: mutateEditBusinessUser,
  });
}
