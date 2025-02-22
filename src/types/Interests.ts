interface Service {
  id: number;
  name_en: string;
  name_ar: string;
  category_id: number;
  service_type: number;
  [key: `name_${string}`]: string | undefined;
}

export interface Category {
  id: number;
  parent_id: number | null;
  name_en: string;
  name_ar: string;
  alias: string;
  children: Category[];
  services: Service[];
  [key: `name_${string}`]: string | undefined;
}

export interface UserInterests {
  id: number;
  service_id: number;
  user_id: number;
}

export interface InterestsPageProps {
  categories: Category[];
  userInterests: UserInterests[];
  userId: string;
}
