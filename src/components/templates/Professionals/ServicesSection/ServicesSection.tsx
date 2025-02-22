"use client";
import CategoryCard from "@/components/molecules/CategoryCard/CategoryCard";
import NoData from "@/components/molecules/NoDate/NoDate";
import SearchBox from "@/components/molecules/SearchBox/SearchBox";
import Professionals from "@/components/pages/Professionals/Professionals";
import { useLanguage } from "@/hooks/useLanguage";
import { t } from "i18next";
import React, { Key, useState } from "react";

interface ServicesSectionProps {
  categoryId: string;
  professionalsServices: {
    service_type: number;
    images: any;
    id: Key | null | undefined;
    category: any;
    name_en: string;
    [key: `name_${string}`]: string | undefined;
    children: { name_en: string; images: { url: string }[] }[];
  }[];
}

const ServicesSection: React.FC<ServicesSectionProps> = ({
  professionalsServices,
  categoryId,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const lang = useLanguage();
  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <div className="pt-10">
      <SearchBox
        name="professionals-services"
        title={
          professionalsServices[0]?.service_type === 1
            ? t("professionals.professionals_services")
            : t("professionals.supplier_services") || "Bussines users"
        }
        desc={
          professionalsServices[0]?.service_type === 1
            ? t("professionals.services_desc")
            : t("professionals.product_group_desc")
        }
        placeholder={
          professionalsServices[0]?.service_type === 1
            ? t("professionals.search_placeholder")
            : t("professionals.search_placeholder_suppliers")
        }
        categoryTitle={
          professionalsServices[0]?.category[`name_${lang}`] ||
          professionalsServices[0]?.category.name_en
        }
        onSearch={handleSearch}
      />
      {searchQuery.length === 0 ? (
        <>
          {professionalsServices?.length === 0 && <NoData />}
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 my-10 h-auto overflow-hidden rounded-3xl">
            {professionalsServices?.map((service) => (
              <CategoryCard
                link={`/services/${service.id}/professionals`}
                key={service.id}
                imageUrl={service.images[0]?.url}
                name={service[`name_${lang}`] || service.name_en}
              />
            ))}
          </div>
        </>
      ) : (
        <Professionals
          isSearchMode
          searchQueryFromCategories={searchQuery}
          categoryId={categoryId}
        />
      )}
    </div>
  );
};

export default ServicesSection;
