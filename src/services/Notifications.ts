import apiClient from "@/config/apiClient";
import notificationsEndpoints from "@/config/endpoints/notificationsEndpoints";

export const getNotificationsCategories = async () => {
  const response = await apiClient.get(
    `${notificationsEndpoints.notificationsCategories}`
  );
  return response.data;
};

export const getNotifications = async (categoryId: number) => {
  const response = await apiClient.get(
    `${notificationsEndpoints.notifications}${categoryId}`
  );
  return response.data;
};


export const mutateReadNotification = (notificationId: any) => {
  return apiClient.put(`${notificationsEndpoints.readNotifications}/${notificationId}`);
};
