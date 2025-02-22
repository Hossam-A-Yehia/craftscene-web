import { getPackages } from "@/services/Packages";
import { useQuery } from "@tanstack/react-query";

export function useFetchPackages() {
  return useQuery({
    queryKey: ["packages"],
    queryFn: getPackages,
    staleTime: Infinity,
  });
}
