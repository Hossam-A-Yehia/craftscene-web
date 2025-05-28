import apiClient from "@/config/apiClient";
import blogsEndpoints from "@/config/endpoints/blogsEndpoints";

export const getBlogs = async () => {
  const response = await apiClient.get(`${blogsEndpoints.getBlogs}`);
  return response.data.payload.data;
};
export const getBlog = async (id: string) => {
  const queryParams: string[] = [];
  console.log(id);
  
  if (id) {
    queryParams.push(`filters[id][$eq]=${id}`);
  }
    const queryString = queryParams.join("&");

  const response = await apiClient.get(`${blogsEndpoints.getBlogs}?${queryString}`);
  return response.data.payload.data;
};

