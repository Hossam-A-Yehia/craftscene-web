import { getWallet } from "@/services/useWallet";
import { useQuery } from "@tanstack/react-query";

export function useFetchWallet(userId: string) {
  return useQuery({
    queryKey: ["wallet"],
    queryFn: () => getWallet(userId),
  });
}
