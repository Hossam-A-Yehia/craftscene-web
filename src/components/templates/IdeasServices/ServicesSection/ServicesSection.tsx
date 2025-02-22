"use client";
import CategoryCard from "@/components/molecules/CategoryCard/CategoryCard";
import NoData from "@/components/molecules/NoDate/NoDate";
import { useLanguage } from "@/hooks/useLanguage";
import React, { Key } from "react";

interface ServicesSectionProps {
  services: {
    images: any;
    id: Key | null | undefined;
    category: any;
    name_en: string;
    [key: `name_${string}`]: string | undefined;

    children: { name_en: string; images: { url: string }[] }[];
  }[];
}

const ServicesSection: React.FC<ServicesSectionProps> = ({ services }) => {
  const lang = useLanguage();

  return (
    <div className="">
      {services?.length === 0 && <NoData />}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 h-auto overflow-hidden rounded-3xl">
        {services?.map((service) => (
          <CategoryCard
            link={`/ideas/${service.id}`}
            key={service.id}
            imageUrl={service.images[0]?.url}
            name={service[`name_${lang}`] || service.name_en}
          />
        ))}
      </div>
    </div>
  );
};

export default ServicesSection;
