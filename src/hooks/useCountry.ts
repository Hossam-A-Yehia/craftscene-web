import { getCountries } from "@/services/CountryCity";
import { useQuery } from "@tanstack/react-query";

export function useCountry(countryId?: number) {
  return useQuery({
    queryKey: ["countries", countryId],
    queryFn: () => getCountries(countryId),
    initialData: { data: { payload: [] } },
  });
}
