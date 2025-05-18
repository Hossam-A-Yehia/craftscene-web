import { OptionType } from "./Molecules";

export interface PhoneEmailExistenceCheckData {
  email: string;
  phone: string;
  type: number;
}

export interface PhoneEmailExistenceCheckResponse {
  data: { email_exists: boolean; phone_exists: boolean };
}

export interface CompleteProfile {
  user_id: number | null;

  // step 1 info
  profile: File | null;
  logo: File | null;
  business_name: string;
  business_email: string;
  phone: string;
  lang: number | null;
  lat: number | null;
  country_id: number | null;
  city_id: number | null;
  hotline: string;
  categories: OptionType[];

  // step 2 services
  services: {
    parentCategory: number;
    services: OptionType[];
  }[];
  suggestService: {
    name_ar: string;
    name_en: string;
    category_id: number;
    service_type: number;
  } | null;
  // step 3 history
  classifications: [];
  price_range: number | null;
  volume_of_work: number | null;
  number_of_employees: number | string | null;
  years_of_experience: number | null;
  accomplished_projects_count: number | null;
  // step 4 resume
  business_desc_en: string;
  business_desc_ar: string;
  files: { file: File; type: number | null }[];
  setIsModalOpen?:any
}

export interface BusinessUserDetailsStore {
  business_name: string;
  business_email: string;
  phone: string;
  years_of_experience: number;
  number_of_employees: number;
  volume_of_work: number;
  price_range: number;
  cover: File;
  logo: File;
  city_id: number;
  lang: number;
  lat: number;
  classifications: number[];
  business_desc: string;
  files: File[];
  hotline: string;
  user_id: number;
}
export interface BusinessUserDetailsCategoriesStore {
  user_id: number;
  category_id: number;
}
export interface BusinessUserDetailsServicesStore {
  user_id: number;
  service_id: number;
}

export interface SuggestedServicesStore {
  name_ar: string;
  name_en: string;
  category_id: number;
  service_type: number;
}
