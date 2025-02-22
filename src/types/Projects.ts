export interface ProjectType {
  payload: any;
  ideas: [];
  images: [{ url: string }];
  id: number;
  title_ar: string;
  title_en: string;
  country_id: number;
  created_at: string;
  updated_at: string;
  lang: string;
  lat: string;
  [key: `title_${string}`]: string | undefined;
}

export interface Project {
  id: number;
  title_en: string;
  [key: `title_${string}`]: string | undefined;

  images: {
    title: string | null;
    alt: string | null;
    caption: string | null;
    url: string;
  }[];
}
