"use client";
import React, { useState, useEffect, useMemo } from "react";
import SearchBox from "@/components/molecules/SearchBox/SearchBox";
import {
  CheckboxGroup,
  CheckboxGroupForValues,
} from "@/components/molecules/CheckboxGroup/CheckboxGroup";
import { useFetchFilterIdeas, useFetchIdeas } from "@/hooks/useIdeas";
import { useQuery } from "@/hooks/useQuery";
import Card from "@/components/molecules/Card/Card";
import Loader from "@/components/atoms/Loader/Loader";
import ErrorMessage from "@/components/atoms/ErrorMessage/ErrorMessage";
import Pagination from "@/components/molecules/Pagination/Pagination";
import { useFetchServices } from "@/hooks/useServices";
import { useLanguage } from "@/hooks/useLanguage";
import {
  Attribute,
  Idea,
  OptionType,
  ServicePayload,
  ValuesOptionType,
} from "@/types/Ideas";
import { t } from "i18next";
import NoDataSection from "@/components/molecules/NoDate/NoDate";
import { useParams } from "next/navigation";
interface IdeasProps {
  filterFromService?: boolean;
  selectedServiceProvidersTypes?: number[];
  categories?: any;
  setSelectedServiceProvidersTypes?: any;
  ideasCategories?: any;
  selectedCategories?: any;
  setSelectedCategories?: any;
  searchQueryFromServices?: any;
}
const Ideas: React.FC<IdeasProps> = ({
  filterFromService,
  selectedServiceProvidersTypes,
  categories,
  setSelectedServiceProvidersTypes,
  ideasCategories,
  selectedCategories,
  setSelectedCategories,
  searchQueryFromServices,
}) => {
  const params = useParams();
  const serviceId = params ? params.serviceId : null;

  const queryParams = useQuery();
  const lang = useLanguage();
  const [selectedServices, setSelectedServices] = useState<number[]>([]);
  const [selectedValues, setSelectedValues] = useState<ValuesOptionType[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const {
    data: ideasData,
    isLoading: isLoadingIdeas,
    error: ideasError,
  } = useFetchIdeas(
    {
      ...queryParams,
      serviceId: serviceId,
      values: selectedValues,
      page: currentPage,
    },
    selectedValues.length === 0
  );

  const { data: filterIdeasData } = useFetchFilterIdeas(
    {
      ...queryParams,
      services: selectedServices,
      values: selectedValues,
      page: currentPage,
      serviceId,
      searchQuery: searchQueryFromServices || searchQuery,
      subCategories: selectedCategories,
      serviceProvidersTypes: selectedServiceProvidersTypes,
    },
    selectedValues.length > 0 ||
      searchQuery.length > 0 ||
      searchQueryFromServices?.length > 0 ||
      selectedCategories?.length > 0
  );

  const { data: servicesData, isLoading: isLoadingServices } = useFetchServices(
    {
      paginate: false,
      type: 1,
      id: serviceId,
      subCategories: selectedCategories,
      serviceProvidersTypes: selectedServiceProvidersTypes,
    }
  );

  const ideas = useMemo(() => ideasData?.payload.data ?? [], [ideasData]);
  const filterIdeas = useMemo(
    () => filterIdeasData?.payload?.results?.data ?? [],
    [filterIdeasData]
  );
  const lastPage =
    filterIdeas?.length === 0
      ? ideasData?.payload.last_page
      : filterIdeasData?.payload.results.last_page;

  const allAttributes = useMemo<Attribute[]>(
    () =>
      servicesData?.payload?.flatMap(
        (service: ServicePayload) => service.attributes
      ) ?? [],
    [servicesData]
  );

  const filterAttributes = useMemo<Attribute[]>(() => {
    const attributesMap = allAttributes.reduce<Record<number, Attribute>>(
      (acc, attr) => {
        if (!acc[attr.id]) {
          acc[attr.id] = {
            ...attr,
            pivot: Array.isArray(attr.pivot) ? [...attr.pivot] : [attr.pivot],
            types: [...attr.types],
          };
        } else {
          acc[attr.id].pivot = acc[attr.id].pivot.concat(attr.pivot);
          acc[attr.id].types = [...acc[attr.id].types, ...attr.types];
        }
        return acc;
      },
      {}
    );
    return Object.values(attributesMap);
  }, [allAttributes]);
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedValues]);

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= lastPage) setCurrentPage(page);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const renderIdeas = useMemo(() => {
    const data =
      selectedValues.length > 0 ||
      searchQuery.length > 0 ||
      searchQueryFromServices?.length > 0 ||
      selectedCategories?.length > 0
        ? filterIdeas
        : ideas;
    if (data.length === 0) {
      return (
        <div className="col-span-3 w-1/2 mx-auto mt-5">
          <NoDataSection />
        </div>
      );
    }
    return data.map((idea: Idea) => (
      <div key={idea.id} className="col-span-1">
        <Card
          imageUrl={idea.images[0]?.url}
          altText={idea.title_en}
          link={`/idea/${idea.id}`}
        />
      </div>
    ));
  }, [
    ideas,
    filterIdeas,
    selectedValues,
    searchQuery.length,
    searchQueryFromServices?.length,
    selectedCategories?.length,
  ]);

  return (
    <div className="min-h-[calc(100vh-80px)] bg-[#F6F7FC] pt-6">
      <main className="container mx-auto p-4">
        {!filterFromService && (
          <SearchBox
            name="ideas"
            title={t("ideas.title")}
            desc={t("ideas.desc")}
            onSearch={handleSearch}
            placeholder={t("ideas.search_placeholder")}
          />
        )}
        <div className="grid grid-cols-3 md:grid-cols-4 gap-5">
          <aside className="col-span-1 flex flex-col gap-3">
            {filterFromService && (
              <>
                <CheckboxGroup
                  title={t("ideas.service_providers_type")}
                  options={categories}
                  selectedOptions={selectedServiceProvidersTypes}
                  onChange={setSelectedServiceProvidersTypes}
                  opened
                />
                <CheckboxGroup
                  title={t("ideas.categories")}
                  options={ideasCategories}
                  selectedOptions={selectedCategories}
                  onChange={setSelectedCategories}
                />
                {selectedCategories.length !== 0 ||
                selectedServiceProvidersTypes?.length !== 0 ? (
                  <CheckboxGroup
                    title={t("ideas.services")}
                    options={servicesData?.payload}
                    selectedOptions={selectedServices}
                    onChange={setSelectedServices}
                    isLoading={isLoadingServices}
                  />
                ) : (
                  ""
                )}
              </>
            )}
            {filterAttributes.map((attribute) => (
              <CheckboxGroupForValues
                key={attribute.id}
                title={attribute[`name_${lang}`] || attribute.name_en}
                options={
                  JSON.parse(attribute.values || "[]").map(
                    ({ en, ar }: { en: string; ar: string }): OptionType => ({
                      name_en: en,
                      name_ar: ar,
                      attributesId: attribute.id,
                    })
                  ) || []
                }
                selectedOptions={selectedValues}
                onChange={setSelectedValues}
              />
            ))}
          </aside>
          <div className="h-fit col-span-2 md:col-span-3 lg:col-span-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {isLoadingIdeas ? (
              <div className="mt-10 col-span-3">
                <Loader />
              </div>
            ) : (
              renderIdeas
            )}
            {ideasError && <ErrorMessage />}
          </div>
        </div>
        {!isLoadingIdeas && (
          <Pagination
            currentPage={currentPage}
            lastPage={lastPage}
            onPageChange={handlePageChange}
          />
        )}
      </main>
    </div>
  );
};

export default Ideas;
