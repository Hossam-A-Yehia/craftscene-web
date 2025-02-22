import { FiltersProducts, Products } from "@/services/Products";
import { useQuery } from "@tanstack/react-query";

export function useFetchProducts(
  params: Record<string, any>,
  isEnabled: boolean
) {
  return useQuery({
    queryKey: ["Products", params],
    queryFn: () => Products(params),
    enabled: isEnabled,
  });
}

export function useFetchFilterProducts(
  params: Record<string, any>,
  isEnabled: boolean
) {
  return useQuery({
    queryKey: ["FilterProducts", params],
    queryFn: () => FiltersProducts(params),
    enabled: isEnabled,
  });
}
