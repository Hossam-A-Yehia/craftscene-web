export interface HeroSliderData {
  logo: string;
  business_name?: string;
  id: number;
  title_en: string;
  [key: `title_${string}`]: string | undefined;
  images: { url: string }[];
  user: {
    first_name: string;
    last_name: string;
  };
  values: {
    value: string;
  }[];
}

export interface CategoriesData {
  created_at: string;
  has_ideas: number;
  id: number;
  name_en: string;
  parent_id: string;
  [key: `name_${string}`]: string | undefined;
  images: { url: string }[];
  user: {
    first_name: string;
    last_name: string;
  };
  services: {
    value: string;
  }[];
  children: {
    alias: string;
    name_en: string;
    [key: `name_${string}`]: string | undefined;
  }[];
}

export interface CategoriesData {
  payload: CategoriesData[];
}
