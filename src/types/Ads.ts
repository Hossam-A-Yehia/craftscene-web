interface BusinessUserDetail {
  id: number;
  business_name: string;
  business_email: string;
  phone: string;
  years_of_experience: number;
  number_of_employees: number;
  volume_of_work: string;
  price_range: string;
  logo: string;
  profile: string;
  city_id: number;
  lang: string;
  lat: string;
  user_id: number;
  created_at: string;
  updated_at: string;
  accomplished_projects_count: number | null;
  main_clients: string | null;
  business_des: string | null;
  hotline: string | null;
  show_in_JB: string | null;
  calls: number;
}

interface User {
  id: number;
  created_by: number | null;
  username: string;
  email: string;
  phone: string | null;
  email_verified_at: string;
  phone_verified_at: string | null;
  user_type: number;
  account_status: number;
  birth_date: string | null;
  gender: string;
  experience_level: string | null;
  referral_code: string;
  city_id: number;
  deleted_at: string | null;
  created_at: string;
  updated_at: string;
  first_name: string;
  last_name: string;
  user_type_value: string;
  country_id: number;
  business_user_detail: BusinessUserDetail | null;
}

interface Image {
  id: number;
  title: string;
  alt: string | null;
  caption: string | null;
  url: string;
  imageable_id: number;
  imageable_type: string;
  created_at: string;
  updated_at: string;
}

export interface Ad {
  id: number;
  user_id: number;
  created_at: string;
  updated_at: string;
  position: number;
  modelable_type: string;
  modelable_id: number;
  title_en: string;
  description_en: string;
  from_date: string;
  to_date: string;
  position_id: number | null;
  title_ar: string;
  description_ar: string;
  user: User;
  images: Image[];
}
