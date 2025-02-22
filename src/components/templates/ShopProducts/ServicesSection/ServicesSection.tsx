"use client";
import CategoryCard from "@/components/molecules/CategoryCard/CategoryCard";
import NoData from "@/components/molecules/NoDate/NoDate";
import SearchBox from "@/components/molecules/SearchBox/SearchBox";
import Products from "@/components/pages/Products/Products";
import { useLanguage } from "@/hooks/useLanguage";
import { t } from "i18next";
import React, { Key, useState } from "react";

interface ServicesSectionProps {
  productsServices: {
    images: any;
    id: Key | null | undefined;
    category: any;
    name_en: string;
    [key: `name_${string}`]: string | undefined;

    children: { name_en: string; images: { url: string }[] }[];
  }[];
}

const ServicesSection: React.FC<ServicesSectionProps> = ({
  productsServices,
}) => {
  const [searchQuery, setSearchQuery] = useState("");

  const lang = useLanguage();
  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <div className="pt-10">
      <SearchBox
        name="products-services"
        title={t("products.products_services")}
        desc={t("products.services_desc")}
        placeholder={t("products.search_placeholder")}
        categoryTitle={
          productsServices[0]?.category[`name_${lang}`] ||
          productsServices[0]?.category.name_en
        }
        onSearch={handleSearch}
      />
      {searchQuery.length === 0 ? (
        <>
          {productsServices?.length === 0 && <NoData />}
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 my-10 h-auto overflow-hidden rounded-3xl">
            {productsServices?.map((service) => (
              <CategoryCard
                link={`/services/${service.id}/products`}
                key={service.id}
                imageUrl={service.images[0]?.url}
                name={service[`name_${lang}`] || service.name_en}
              />
            ))}
          </div>
        </>
      ) : (
        <Products
          isSearchMode
          searchQueryFromCategories={searchQuery}
          productsServices={productsServices}
        />
      )}
    </div>
  );
};

export default ServicesSection;
