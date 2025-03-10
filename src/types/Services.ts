export interface Service {
  id: string;
  name_ar: string;
  name_en: string;
  [key: `name_${string}`]: string | undefined;

  service: {
    id: number;
    name_ar: string;
    name_en: string;
    [key: `name_${string}`]: string | undefined;
    images: {
      url: string;
      title: string;
      alt: string;
    }[];
  };
}

export interface ServiceCardProps {
  service: Service;
  userType: number;
}
