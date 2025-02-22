"use client";
import NoData from "@/components/molecules/NoDate/NoDate";
import SearchBox from "@/components/molecules/SearchBox/SearchBox";
import CategoriesGrid from "@/components/organisms/CategoriesGrid/CategoriesGrid";
import Professionals from "@/components/pages/Professionals/Professionals";
import { useLanguage } from "@/hooks/useLanguage";
import { extractLeafChildren } from "@/utils/getNestedChildren";
import { t } from "i18next";
import React, { useState } from "react";

interface CategoriesSectionProps {
  professionalsCategories: {
    name_en: string;
    name_ar: string;
    [key: `name_${string}`]: string | undefined;
    children: { name_en: string; images: { url: string }[] }[];
  };
  supplierCategories: {
    name_en: string;
    name_ar: string;
    [key: `name_${string}`]: string | undefined;
    children: { name_en: string; images: { url: string }[] }[];
  }[];
  parentCategoryId: string;
}

const CategoriesSection: React.FC<CategoriesSectionProps> = ({
  professionalsCategories,
  parentCategoryId,
  supplierCategories,
}) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };
  const lang = useLanguage();
  const allProfessionalsCategories = extractLeafChildren(
    professionalsCategories?.children
  );

  return (
    <div className="pt-10">
      <SearchBox
        name="professionals-categories"
        title={
          professionalsCategories
            ? t("professionals.professionals")
            : t("professionals.suppliers") || "Bussiness users"
        }
        desc={t("professionals.categories_desc")}
        placeholder={
          professionalsCategories
            ? t("professionals.search_placeholder")
            : t("professionals.search_placeholder_suppliers") ||
              "Search a Bussiness user"
        }
        categoryTitle={
          professionalsCategories
            ? professionalsCategories[`name_${lang}`] ||
              professionalsCategories?.name_en
            : supplierCategories[0][`name_${lang}`] ||
              supplierCategories[0]?.name_en
        }
        onSearch={handleSearch}
      />

      {searchQuery.length === 0 ? (
        <>
          {professionalsCategories?.children?.length === 0 && <NoData />}
          <CategoriesGrid
            link={"professionals-services"}
            categories={
              allProfessionalsCategories.length !== 0
                ? allProfessionalsCategories
                : supplierCategories[0].children || []
            }
          />
        </>
      ) : (
        <Professionals
          isSearchMode
          searchQueryFromCategories={searchQuery}
          categoryId={parentCategoryId}
        />
      )}
    </div>
  );
};

export default CategoriesSection;
