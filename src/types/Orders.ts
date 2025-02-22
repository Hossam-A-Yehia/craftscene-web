export interface Product {
  order_product_id: number;
  product_status: number;
  quantity: number;
  price: number;
  variant_images: {
    url: string;
    title: string;
  }[];
  user: any;
  id: number;
  title_en: string;
  title_ar: string;
  short_des_en: string;
  rich_des_en: string;
  [key: `title_${string}`]: string | undefined;
  [key: `short_${string}`]: string | undefined;
}

export interface Variant {
  id: number;
  quantity: number;
  price: number;
  product: Product;
  images: Array<{
    url: string;
    title: string;
  }>;
}

export interface CartItemType {
  id: number;
  quantity: number;
  variant: Variant;
  user: {
    first_name: string;
    last_name: string;
  };
}

export interface GroupedProducts {
  [supplier: string]: CartItemType[];
}

export interface SupplierSectionProps {
  items: CartItemType[];
  isCheckout?: boolean;
}

export interface Order {
  id: number;
  user_id: number;
  created_at: string;
  updated_at: string;
  address_id: number;
  phone: string;
  status: number;
  total_price: number;
  delivery_status: number;
  delivery_date: string | null;
  shipping: string | null;
  supplier_name: string;
  client_name?: string;
}

// Supplier Business Details Interface
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
  accomplished_projects_count: number;
  main_clients: string | null;
  business_des: string | null;
  hotline: string | null;
  show_in_JB: string | null;
  calls: number;
}

// Supplier Interface
interface Supplier {
  id: number;
  created_by: number;
  username: string;
  email: string;
  phone: string;
  email_verified_at: string;
  phone_verified_at: string;
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
  laravel_through_key: number;
  user_type_value: string;
  country_id: number;
  business_user_detail: BusinessUserDetail;
}

interface DeliveryCity {
  id: number;
  name_en: string;
  name_ar: string;
}

interface DeliveryCountry {
  id: number;
  name_en: string;
  name_ar: string;
}

interface DeliveryAddress {
  address_id: number;
  street_address: string;
  city: DeliveryCity;
  country: DeliveryCountry;
  post_code: string;
}

export interface ResponseData {
  order: Order;
  products: Product[];
  supplier: Supplier;
  delivery_address: DeliveryAddress;
}
