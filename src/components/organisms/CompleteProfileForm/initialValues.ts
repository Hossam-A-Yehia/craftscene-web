import { CompleteProfile } from "@/types/CompleteProfile";

export const initialValues: CompleteProfile = {
  user_id: null,
  // basic
  business_name: "",
  business_email: "",
  phone: "",
  hotline: "",
  country_id: null,
  city_id: null,
  categories: [],
  profile: null,
  logo: null,
  lat: null,
  lang: null,
  // services
  services: [],
  suggestService: null,
  // history
  classifications: [],
  price_range: 1,
  volume_of_work: 0,
  number_of_employees: "",
  years_of_experience: 0,
  accomplished_projects_count: 0,
  // resume
  business_desc_en: "",
  business_desc_ar: "",
  files: [],
  // packages
  package_id: 1,
};
