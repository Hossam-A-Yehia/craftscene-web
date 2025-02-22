export type Address = {
  id: number;
  title: string;
  street_address: string;
  phone: string | null;
  city: { name_en: string };
  special_instructions: string;
  is_default: number;
};
