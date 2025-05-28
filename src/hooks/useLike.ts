import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import {
  useFetchLikes,
  useMutateAddLike,
  useMutateRemoveLike,
} from "@/hooks/useLikes";
import { useUser } from "@/context/UserContext";

export const useLike = (
  userId: number,
  modelableType: "UserIdea" | "Product" | "BusinessUserDetail" | "Post"
) => {
  const { userData } = useUser();
  const queryClient = useQueryClient();

  const { data: likes, isLoading: isLikesLoading } = useFetchLikes(userId);
  const { mutateAsync: mutateAddLike, isPending: isPendingAddLike } =
    useMutateAddLike(userId, modelableType);
  const { mutateAsync: mutateRemoveLike, isPending: isPendingRemoveLike } =
    useMutateRemoveLike();

  const isLiked = likes?.some(
    (like: { user_id: number }) => Number(like.user_id) === Number(userData?.id)
  );
  const likeId = likes?.find(
    (like: { user_id: number }) => like.user_id === userData?.id
  )?.id;

  const handleLike = async () => {
    try {
      if (isLiked) {
        await mutateRemoveLike(likeId);
      } else {
        await mutateAddLike();
      }
      queryClient.invalidateQueries({ queryKey: ["Likes"] });
    } catch (error: any) {
      toast.error("Failed to update like", error);
    }
  };

  return {
    isLiked,
    likes,
    isLikesLoading,
    isPendingAddLike,
    isPendingRemoveLike,
    handleLike,
  };
};
