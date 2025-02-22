"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useMemo } from "react";

export function useQuery() {
  const searchParams = useSearchParams();

  const params = useMemo(() => {
    const paramsObj: Record<string, string> = {};
    if (searchParams) {
      searchParams.forEach((value, key) => {
        paramsObj[key] = value;
      });
    }
    return paramsObj;
  }, [searchParams]);

  return params;
}

export function useUpdateQuery() {
  const router = useRouter();
  const searchParams = useSearchParams() ?? new URLSearchParams();

  const updateQuery = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(key, value);

    router.replace(`?${params.toString()}`, { scroll: false });
  };

  return updateQuery;
}
