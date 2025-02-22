import {
  addReply,
  getMyInvitations,
  getMyRFQs,
  getQuotations,
  getRfpBusinessUsersAPI,
  mutateAcceptQuotation,
  mutateAddRFP,
  mutateDeclineQuotation,
} from "@/services/Rfqs";
import { GetQuotationsParams, GetRfpBusinessUsersParams } from "@/types/RFQs";
import { useMutation, useQuery } from "@tanstack/react-query";

export function useMutateAddRFP() {
  return useMutation({
    mutationFn: mutateAddRFP,
  });
}

export function useFetchRfpBusinessUsers(params: GetRfpBusinessUsersParams) {
  return useQuery({
    queryKey: ["rfpBusinessUsers", params],
    queryFn: () => getRfpBusinessUsersAPI(params),
    enabled: true,
  });
}

export function useFetchMyRFQs(id: string | null, isInvitation: boolean) {
  return useQuery({
    queryKey: ["RFQs"],
    queryFn: () => getMyRFQs(id || ""),
    enabled: isInvitation,
  });
}
export function useFetchQuotations(params: GetQuotationsParams) {
  return useQuery({
    queryKey: ["Quotations", params],
    queryFn: () => getQuotations(params),
  });
}
export function useFetchMyInvitations(
  id: string | null,
  isInvitation: boolean
) {
  return useQuery({
    queryKey: ["invitations"],
    queryFn: () => getMyInvitations(id || ""),
    enabled: isInvitation,
  });
}

export function useMutateAcceptQuotation() {
  return useMutation({
    mutationFn: mutateAcceptQuotation,
  });
}

export function useMutateDeclineQuotation() {
  return useMutation({
    mutationFn: mutateDeclineQuotation,
  });
}

export function useMutateAddReply() {
  return useMutation({
    mutationFn: addReply,
  });
}
