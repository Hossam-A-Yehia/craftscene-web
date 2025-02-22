"use client";
import NoData from "@/components/molecules/NoDate/NoDate";
import SearchBox from "@/components/molecules/SearchBox/SearchBox";
import CategoriesGrid from "@/components/organisms/CategoriesGrid/CategoriesGrid";
import Products from "@/components/pages/Products/Products";
import { t } from "i18next";
import { useParams } from "next/navigation";
import React, { useState } from "react";

interface CategoriesSectionProps {
  productsCategories: {
    name_en: string;
    name_ar: string;
    [key: `name_${string}`]: string | undefined;
    children: { name_en: string; images: { url: string }[] }[];
  }[];
}

const CategoriesSection: React.FC<CategoriesSectionProps> = ({
  productsCategories,
}) => {
  const params = useParams();
  const categoryId = params ? params.categoryId : null;

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);

  const rootCategory = productsCategories[0];

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };
  return (
    <div className="pt-10">
      {
        <SearchBox
          name="products-categories"
          title={
            searchQuery
              ? t("products.products")
              : t("products.products_categories")
          }
          desc={
            searchQuery
              ? t("products.products_desc")
              : t("products.categories_desc")
          }
          placeholder={t("products.search_placeholder")}
          onSearch={handleSearch}
        />
      }
      {searchQuery.length === 0 ? (
        <>
          {rootCategory?.children.length === 0 && <NoData />}
          <CategoriesGrid
            link={"products-services"}
            categories={rootCategory?.children || []}
          />
        </>
      ) : (
        <Products
          isSearchMode
          searchQueryFromCategories={searchQuery}
          categoryId={String(categoryId)}
          categories={rootCategory?.children}
          selectedCategories={selectedCategories}
          setSelectedCategories={setSelectedCategories}
        />
      )}
    </div>
  );
};

export default CategoriesSection;
