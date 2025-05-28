import apiClient from "@/config/apiClient";
import likesEndpoints from "@/config/endpoints/likesEndpoints";

export const getLikes = async (modelableId: number) => {
  const response = await apiClient.get(
    `${likesEndpoints.likes}?filters[modelable_id][$eq]=${modelableId}`
  );
  return response.data.payload.data;
};

export const likeTheModelable = (
  modelableId: number,
  modelableType: "UserIdea" | "Product" | "BusinessUserDetail" | "Post"
) => {
  return apiClient.post(`${likesEndpoints.likes}`, {
    modelable_id: modelableId,
    modelable_type: "App\\Models\\" + modelableType,
  });
};

export const removeLike = (likeId: number) => {
  return apiClient.delete(`${likesEndpoints.likes}/${likeId}`);
};
