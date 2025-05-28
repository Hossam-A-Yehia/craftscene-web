import React, { useState, useRef, useEffect } from "react";
import {
  useFetchNotificationCategories,
  useFetchNotifications,
  useMutateReadNotification,
} from "@/hooks/useNotifications";
import { Notification, NotificationCategory } from "@/types/Notifications";
import { formatDate } from "@/utils/generalUtils";
import { useRouter } from "next/navigation";
import { FiBell, FiX } from "react-icons/fi";
import { useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

const NotificationsDropdown: React.FC = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { data: categoriesData } = useFetchNotificationCategories();
  const queryClient = useQueryClient();
  const { data: notificationsData } = useFetchNotifications(
    selectedCategory || 0
  );
  const { mutateAsync: mutateReadNotification } = useMutateReadNotification();

  const handleMarkAsRead = (notification: Notification) => {
    if (notification.read_at === null) {
      mutateReadNotification(notification.id)
        .then(() => {
          queryClient.invalidateQueries({ queryKey: ["Notifications"] });
          queryClient.invalidateQueries({ queryKey: ["NotificationCategories"] });
        })
        .catch((err) => {
          console.error("Error marking notification as read:", err);
        });
    }
  };

  const categories = categoriesData?.payload || [];
  const notifications = notificationsData?.payload?.data || [];

  useEffect(() => {
    if (categories.length > 0 && selectedCategory === null) {
      setSelectedCategory(categories[0].id);
    }
  }, [categories]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleNotificationClick = (notification: Notification) => {
    // Mark notification as read if it's unread
    if (notification.read_at === null) {
      handleMarkAsRead(notification);
    }

    switch (notification.notification_type) {
      case "Invitation":
        router.push(`/invitations/${notification.target_id}`);
        break;
      case "rfq":
        router.push(`/rfqs/${notification.target_id}`);
        break;
      case "my_ask":
        router.push(`/asks/${notification.target_id}`);
        break;
      case "received_ask":
        router.push(`/received-asks/${notification.target_id}`);
        break;
      case "MyOrder":
        router.push(`/orders/${notification.target_id}`);
        break;
      case "received_order":
        router.push(`/incoming-orders`);
        break;
      case "rfq_reply":
        router.push(`/rfqs/${notification.target_id}`);
        break;
      case "ask_reply":
        router.push(`/asks/${notification.target_id}`);
        break;
      case "Referral":
        router.push(`/wallet/${notification.target_id}`);
        break;
      default:
        console.log(
          "Unknown notification type:",
          notification.notification_type
        );
    }
    setIsOpen(false);
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "Invitation":
        return "👋";
      case "Mention":
        return "@";
      case "System":
        return "🔧";
      case "Update":
        return "🆕";
      default:
        return "📢";
    }
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60 * 60)
    );

    if (diffInHours < 1) return t("notifications.just_now");
    if (diffInHours < 24)
      return t("notifications.hours_ago", { hours: diffInHours });
    if (diffInHours < 48) return t("notifications.yesterday");
    return formatDate(dateString).formattedDate;
  };

  const totalUnread = categories.reduce(
    (sum, cat) => sum + cat.unread_count,
    0
  );

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-3 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-full transition-all duration-300 group"
      >
        <FiBell
          size={20}
          className="group-hover:scale-110 transition-transform duration-200"
        />
        {totalUnread > 0 && (
          <span className="absolute -top-1 -right-1 inline-flex items-center justify-center min-w-[20px] h-5 text-xs font-bold leading-none text-white bg-gradient-to-r from-red-500 to-pink-500 rounded-full shadow-lg animate-pulse">
            {totalUnread > 99 ? "99+" : totalUnread}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-3 w-[420px] bg-white rounded-2xl shadow-2xl z-50 border border-gray-100 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 border-b border-gray-100">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-xl font-bold text-gray-800">
                {t("notifications.title")}
              </h3>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-white/50 rounded-lg transition-colors duration-200"
                >
                  <FiX size={16} className="text-gray-600" />
                </button>
              </div>
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap gap-2 mb-3">
              {categories.map((category: NotificationCategory) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                    selectedCategory === category.id
                      ? "bg-main text-white shadow-md"
                      : "bg-white/70 text-gray-700 hover:bg-white hover:shadow-sm"
                  }`}
                >
                  {category.name}
                  {category.unread_count > 0 && (
                    <span className="ml-1.5 px-1.5 py-0.5 bg-blue-600 text-white rounded-full text-xs">
                      {category.unread_count}
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* Stats & Actions */}
            <div className="flex justify-end items-center">
              <span className="text-sm text-gray-600">
                {notifications.filter((n: Notification) => !n.read_at).length}{" "}
                {t("notifications.unread")}
              </span>
            </div>
          </div>

          {/* Notifications List */}
          <div className="max-h-[400px] overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-8 text-center">
                <div className="text-6xl mb-4">🔔</div>
                <p className="text-gray-500 text-sm">
                  {t("notifications.no_notifications")}
                </p>
              </div>
            ) : (
              notifications.map((notification: Notification) => (
                <div
                  key={notification.id}
                  className={`group relative border-b border-gray-50 last:border-b-0 hover:bg-gray-50 transition-all duration-200 ${
                    !notification.read_at ? "bg-[#e74d3c24]" : ""
                  }`}
                >
                  <div
                    onClick={() => handleNotificationClick(notification)}
                    className="p-4 cursor-pointer"
                  >
                    <div className="flex items-start gap-3">
                      {/* Icon */}
                      <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center text-lg">
                        {getNotificationIcon(notification.notification_type)}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-gray-800 leading-relaxed mb-1">
                          {notification.notifications_text}
                        </p>
                        <div className="flex items-center gap-3 justify-end">
                          <span className="text-xs text-gray-500">
                            {formatTimeAgo(notification.created_at)}
                          </span>
                        </div>
                      </div>

                      {/* Status & Actions */}
                      <div className="flex items-center">
                        {!notification.read_at && (
                          <span className="size-3 bg-main rounded-full" />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationsDropdown;
