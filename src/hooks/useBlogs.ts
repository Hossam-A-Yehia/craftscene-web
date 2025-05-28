import { getBlogs } from "@/services/Blogs";
import { useQuery } from "@tanstack/react-query";

export function useFetchBlogs() {
  return useQuery({
    queryKey: ["Blogs"],
    queryFn: () => getBlogs(),
  });
}
