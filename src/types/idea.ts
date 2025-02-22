import { Service } from "./Services";

interface Image {
  id: number;
  title: string;
  url: string;
}

interface User {
  id: number;
  username: string;
  business_user_detail: { business_name: string; profile: string };
}

export interface Idea {
  service: Service;
  length: number;
  id: number;
  title_en: string;
  description_en: string;
  title_ar: string;
  description_ar: string;
  user_service_id: number;
  user_project_id: number;
  images: Image[];
  user: User;
  values: [];
  [key: `title_${string}`]: string | undefined;
}
