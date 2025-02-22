interface File {
  id: number;
  url: string;
  type: number;
  fileable_id: number;
  fileable_type: string;
  created_at: string;
  updated_at: string;
}

interface Country {
  id: number;
  name_en: string;
}

interface City {
  id: number;
  name_en: string;
  country_id: number;
  country: Country;
}

interface User {
  id: number;
  username: string;
  user_type: number;
  user_type_value: string;
  city_id: number;
  country_id: number;
  city: City;
}

interface Service {
  id: number;
  name_en: string;
  [key: `name_${string}`]: string | undefined;
}

interface NotifiableUser {
  user_id: string;
  status: number;
}

interface Invitable {
  id: number;
  subject: string;
  description: string;
  status: number;
  service_id: number;
  user_id: number;
  notifiable_users: NotifiableUser[];
  service: Service;
  files: File[];
  user: User;
}

export interface Invitation {
  id: number;
  invitable_id: number;
  invitable_type: string;
  user_id: number;
  created_at: string;
  updated_at: string;
  invitable: Invitable;
}
