export interface PackageType {
  id: number;
  name_en: string;
  desc_en: string;
  price: number;
  created_at: string;
  updated_at: string;
  name_ar: string;
  desc_ar: string;
  duration: number;
  active: number;
  title: number;
  no_ideas: number;
  no_invitation: number;
  no_cvs: number;
  no_media: number;
  no_calls: number;
  no_rfp: number;
  [key: `name_${string}`]: string | undefined;
  [key: `desc_${string}`]: string | undefined;
}

export interface PaginatedResponse<T> {
  payload: {
    current_page: number;
    data: T[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: Array<{
      url: string | null;
      label: string;
      active: boolean;
    }>;
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
  };
}

export type PackageData = PaginatedResponse<PackageType>;
