import { getLikes, likeTheModelable, removeLike } from "@/services/Likes";
import { useMutation } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";

export function useFetchLikes(modelableId: number) {
  return useQuery({
    queryKey: ["Likes"],
    queryFn: () => getLikes(modelableId),
  });
}

export const useMutateRemoveLike = () => {
  return useMutation({
    mutationFn: removeLike,
  });
};

export const useMutateAddLike = (
  modelableId: number,
  modelableType: "UserIdea" | "Product" | "BusinessUserDetail" | "Post"
) => {
  return useMutation({
    mutationFn: () => likeTheModelable(modelableId, modelableType),
  });
};
