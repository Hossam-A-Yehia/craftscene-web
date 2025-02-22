interface Image {
  id: number;
  title: string;
  alt: string;
  caption: string;
  url: string;
}
export interface BusinessInfoType {
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
  accomplished_projects_count: number;
  main_clients: string | null;
  business_des: string | null;
  hotline: string | null;
  show_in_JB: boolean | null;
  calls: number;
  files: File[];
  classifications: any[];
  payload?: [];
}
export interface Product {
  user: {
    id: any;
    business_user_detail: BusinessInfoType;
  };
  created_at: string;
  description_ar: string;
  description_en: string;
  id: number;
  images: Image[];
  title_ar: string;
  title_en: string;
  updated_at: string;
  user_project_id: number | null;
  user_service_id: number;
  short_des_en: string;
  rich_des_en: string;
  [key: `title${string}`]: string | undefined;
  [key: `short_des${string}`]: string | undefined;
  [key: `rich_des${string}`]: string | undefined;
}

interface Attribute {
  type: "SELECT_BOX";
  values: [{ en: string; ar: string }];
}

export interface Variant {
  variant_id: number;
  price: number;
  image_urls: string[];
  Material: {
    en: string;
    ar: string;
  };
  Size: {
    en: string;
    ar: string;
  };
}

export interface VariantProduct {
  attributes: {
    Material: Attribute;
    Size: Attribute;
  };
  variants: Variant[];
}
export interface ProductVariant {
  variant_id: number;
  price: number;
  image_urls: string[];
  Material: {
    en: string;
    ar: string;
  };
  Size: {
    en: string;
    ar: string;
  };
}

export type ProductAttributeType = {
  id: number;
  modelable_id: number;
  modelable_type: string;
  attribute_id: number;
  value: string;
  created_at: string;
  updated_at: string;
  attribute: {
    id: number;
    [key: `name_${string}`]: string | undefined;
    name_en: string;
    name_ar: string;
    data_type: string;
    created_at: string;
    updated_at: string;
    values: string;
  };
};
