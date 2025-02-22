import { FiltersIdeas, Ideas } from "@/services/Ideas";
import { useQuery } from "@tanstack/react-query";

export function useFetchIdeas(params: Record<string, any>, isEnabled: boolean) {
  return useQuery({
    queryKey: ["Ideas", params],
    queryFn: () => Ideas(params),
    enabled: isEnabled,
  });
}
export function useFetchFilterIdeas(
  params: Record<string, any>,
  isEnabled: boolean
) {
  return useQuery({
    queryKey: ["FilterIdeas", params],
    queryFn: () => FiltersIdeas(params),
    enabled: isEnabled,
  });
}
