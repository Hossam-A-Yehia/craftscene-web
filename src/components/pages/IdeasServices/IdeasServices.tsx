"use client";
import Container from "@/components/atoms/Container/Container";
import { CheckboxGroup } from "@/components/molecules/CheckboxGroup/CheckboxGroup";
import Pagination from "@/components/molecules/Pagination/Pagination";
import SearchBox from "@/components/molecules/SearchBox/SearchBox";
import ServicesSection from "@/components/templates/IdeasServices/ServicesSection/ServicesSection";
import { useFetchServices } from "@/hooks/useServices";
import { CategoriesData } from "@/types/Organisms";
import { t } from "i18next";
import { useEffect, useState } from "react";
import Ideas from "../Ideas/Ideas";
import { extractLeafChildren } from "@/utils/getNestedChildren";
import { OptionCheckbox } from "@/types/Molecules";
interface ServicesProps {
  categoriesData: CategoriesData;
}
const IdeasServices: React.FC<ServicesProps> = ({ categoriesData }) => {
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedServiceProvidersTypes, setSelectedServiceProvidersTypes] =
    useState<number[]>([]);

  const categories = categoriesData?.payload?.filter(
    (category: CategoriesData) =>
      category.name_en !== "Supplier" && category.name_en !== "Craftsman"
  );
  const { data: servicesData, isLoading: isLoadingServices } = useFetchServices(
    {
      paginate: true,
      subCategories: selectedCategories,
      type: 1,
      serviceProvidersTypes: selectedServiceProvidersTypes,
      page: currentPage,
    }
  );
  const services = servicesData?.payload.data;
  const lastPage = servicesData?.payload.last_page;
  const ideasCategories = categories
    ?.map((category: any) => category.children)
    .flat()
    .filter((ideaCategory: any) => {
      if (ideaCategory.has_ideas !== 1) return false;
      if (selectedServiceProvidersTypes.length === 0) return true;
      return selectedServiceProvidersTypes.includes(ideaCategory.parent_id);
    });
  useEffect(() => {
    setSelectedCategories([]);
  }, [selectedServiceProvidersTypes]);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedServiceProvidersTypes, selectedCategories, searchQuery]);

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= lastPage) setCurrentPage(page);
  };
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
    setSelectedCategories([]);
    setSelectedServiceProvidersTypes([]);
  };
  const allIdeasCategories = extractLeafChildren(ideasCategories);
  const uniqueData = Object.values(
    allIdeasCategories.reduce(
      (acc: any, item: { name_en: string | number }) => {
        if (!acc[item.name_en]) {
          acc[item.name_en] = item;
        }
        return acc;
      },
      {}
    )
  ) as OptionCheckbox[];

  return (
    <div className="bg-[#F6F7FC] py-10">
      <Container>
        <SearchBox
          name="products-services"
          title={searchQuery ? t("ideas.title") : t("ideas.services")}
          desc={searchQuery ? t("ideas.desc") : t("ideas.services_desc")}
          placeholder={t("ideas.search_placeholder")}
          onSearch={handleSearch}
        />
        {searchQuery ? (
          <Ideas
            categories={categories}
            searchQueryFromServices={searchQuery}
            filterFromService
            selectedServiceProvidersTypes={selectedServiceProvidersTypes}
            ideasCategories={uniqueData}
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
            setSelectedServiceProvidersTypes={setSelectedServiceProvidersTypes}
          />
        ) : (
          <>
            <div className="grid grid-cols-3 md:grid-cols-4 gap-5">
              <aside className="col-span-1 flex flex-col gap-3">
                <CheckboxGroup
                  title={t("ideas.service_providers_type")}
                  options={categories}
                  selectedOptions={selectedServiceProvidersTypes}
                  onChange={setSelectedServiceProvidersTypes}
                  opened
                />
                <CheckboxGroup
                  title={t("ideas.categories")}
                  options={uniqueData}
                  selectedOptions={selectedCategories}
                  onChange={setSelectedCategories}
                  opened
                />
              </aside>
              <div className="col-span-2 md:col-span-3 lg:col-span-3">
                <ServicesSection services={services} />
              </div>
            </div>
            {!isLoadingServices && (
              <Pagination
                currentPage={currentPage}
                lastPage={lastPage}
                onPageChange={handlePageChange}
              />
            )}
          </>
        )}
      </Container>
    </div>
  );
};

export default IdeasServices;
