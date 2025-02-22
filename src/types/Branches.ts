interface City {
  id: number;
  name_ar: string;
  name_en: string;
  country_id: number;
  created_at: string;
  updated_at: string;
  lang: string;
  lat: string;
}

export interface Branch {
  id: number;
  branch_name: string;
  email: string;
  phone: string;
  city_id: number;
  lang: string;
  lat: string;
  user_id: number;
  created_at: string;
  updated_at: string;
  is_default: number;
  city: City;
}
