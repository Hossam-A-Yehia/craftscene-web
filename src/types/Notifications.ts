export interface NotificationCategory {
  id: number;
  name: string;
  unread_count: number;
}

export interface Notification {
  id: number;
  notification_type: string;
  notifications_text: string;
  read_at: string | null;
  created_at: string;
  notification_category: number;
  target_id: number;
}

export interface NotificationCategoryResponse {
  payload: NotificationCategory[];
}

export interface NotificationResponse {
  payload: {
    data: Notification[];
    current_page: number;
    next_page_url: string | null;
    last_page: number;
    per_page: number;
    total: number;
  };
} 