import { useMutation, useQuery } from "@tanstack/react-query";
import {
  NotificationCategoryResponse,
  NotificationResponse,
} from "@/types/Notifications";
import {
  getNotifications,
  getNotificationsCategories,
  mutateReadNotification,
} from "@/services/Notifications";

export const useFetchNotificationCategories = () => {
  return useQuery<NotificationCategoryResponse>({
    queryKey: ["NotificationCategories"],
    queryFn: () => getNotificationsCategories(),
  });
};

export const useFetchNotifications = (categoryId: number) => {
  return useQuery<NotificationResponse>({
    queryKey: ["Notifications", categoryId],
    queryFn: async () => getNotifications(categoryId),
    enabled: !!categoryId,
  });
};

export function useMutateReadNotification() {
  return useMutation({
    mutationFn: mutateReadNotification,
  });
}