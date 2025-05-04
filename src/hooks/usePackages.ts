import { choosePackages, getPackages } from "@/services/Packages";
import { useMutation, useQuery } from "@tanstack/react-query";

export function useFetchPackages() {
  return useQuery({
    queryKey: ["packages"],
    queryFn: getPackages,
    staleTime: Infinity,
  });
}


export const useMutateChoosePackages = () => {
  return useMutation({
    mutationFn: choosePackages,
  });
};
