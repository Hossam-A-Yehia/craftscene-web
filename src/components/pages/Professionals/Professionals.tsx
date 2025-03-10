"use client";
import React, { useState, useEffect, useMemo } from "react";
import SearchBox from "@/components/molecules/SearchBox/SearchBox";
import { CheckboxGroup } from "@/components/molecules/CheckboxGroup/CheckboxGroup";
import { useQuery } from "@/hooks/useQuery";
import Loader from "@/components/atoms/Loader/Loader";
import ErrorMessage from "@/components/atoms/ErrorMessage/ErrorMessage";
import Pagination from "@/components/molecules/Pagination/Pagination";
import { useLanguage } from "@/hooks/useLanguage";
import { useParams } from "next/navigation";
import { t } from "i18next";
import ProfessionalCard from "@/components/molecules/ProfessionalCard/ProfessionalCard";
import {
  useFetchFilterProfessionals,
  useFetchProfessionals,
} from "@/hooks/useUser";
import NoData from "@/components/molecules/NoDate/NoDate";
import {
  CONTRACTOR_CLASSIFICATIONS,
  CRAFTSMEN_ID,
  FREELANCE_ID,
  NUMBER_OF_EMPLOYEES,
  PRICE_RANGE,
  SERVICE_PROVIDER_CONTRACTOR,
  SUPPLIER,
  SUPPLIER_CLASSIFICATIONS,
  VOLUME_OF_WORK,
  YEARS_OF_EXPERIENCE,
} from "@/constants/constants";
import { useCountryData } from "@/hooks/useCountryData";

import { useFetchServices } from "@/hooks/useServices";
const Professionals = ({
  isSearchMode,
  searchQueryFromCategories,
  categoryId,
}: {
  isSearchMode?: boolean;
  searchQueryFromCategories?: string;
  categoryId?: string;
}) => {
  const params = useParams();
  const serviceId = params ? params.serviceId : null;
  const queryParams = useQuery();
  const lang = useLanguage();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedYearsOfExperience, setSelectedYearsOfExperience] = useState<
    number[]
  >([]);
  const [selectedVolumOfWork, setSelectedVolumOfWork] = useState<number[]>([]);
  const [selectedNumberOfEmployees, setSelectedNumberOfEmployees] = useState<
    number[]
  >([]);
  const [selectedClassifications, setSelectedClassifications] = useState<
    number[]
  >([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState<number[]>([]);
  const [selectedCountries, setSelectedCountries] = useState<number[]>([]);
  const [selectedCities, setSelectedCities] = useState<number[]>([]);

  const { countryOptions, cityOptionsFilter } = useCountryData();
  const { data: service } = useFetchServices({ id: serviceId });
  const parentServiceId =
    service?.payload[0]?.category?.parent?.id ||
    service?.payload[0]?.category?.id;

  const isFilterActive =
    selectedYearsOfExperience.length > 0 ||
    selectedVolumOfWork.length > 0 ||
    selectedNumberOfEmployees.length > 0 ||
    selectedClassifications.length > 0 ||
    selectedPriceRange.length > 0 ||
    selectedCities.length > 0 ||
    selectedCountries.length > 0 ||
    searchQuery.length > 0 ||
    (searchQueryFromCategories?.length ?? 0) > 0;

  const {
    data: professionalsData,
    isLoading: isLoadingProducts,
    error: productsError,
  } = useFetchProfessionals(
    {
      page: currentPage,
      serviceId: String(serviceId),
      numberOfEmployees: selectedNumberOfEmployees,
      volumOfWork: selectedVolumOfWork,
      yearsOfExperience: selectedYearsOfExperience,
      priceRanges: selectedPriceRange,
      classifications: selectedClassifications,
    },
    !isFilterActive
  );
  const { data: filterProfessionalsData } = useFetchFilterProfessionals(
    {
      ...queryParams,
      page: currentPage,
      searchQuery: searchQueryFromCategories || searchQuery,
      serviceId: !isSearchMode ? String(serviceId) : null,
      numberOfEmployees: selectedNumberOfEmployees,
      volumOfWork: selectedVolumOfWork,
      yearsOfExperience: selectedYearsOfExperience,
      priceRanges: selectedPriceRange,
      classifications: selectedClassifications,
      categoryId: categoryId,
      cities: selectedCities,
      countries: selectedCountries,
    },
    isFilterActive
  );

  useEffect(() => setCurrentPage(1), []);

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= lastPage) setCurrentPage(page);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const professionals = useMemo(
    () => professionalsData?.payload.data ?? [],
    [professionalsData]
  );

  const filterProfessionals = useMemo(
    () => filterProfessionalsData?.payload?.results?.data ?? [],
    [filterProfessionalsData]
  );
  const lastPage = isFilterActive
    ? filterProfessionalsData?.payload?.results?.last_page
    : professionalsData?.payload?.last_page;
  const renderProducts = useMemo(() => {
    const data = isFilterActive ? filterProfessionals : professionals;
    if (data.length === 0) {
      return (
        <div className="col-span-3 w-1/2 mx-auto mt-5">
          <NoData />
        </div>
      );
    }

    return data.map((professional: any) => (
      <div key={professional.id} className="col-span-1">
        <ProfessionalCard
          id={professional?.user?.id}
          image={professional.profile}
          profileImage={professional.logo}
          name={professional.business_name}
          location={`${professional.city[`name_${lang}`]}`}
          email={professional?.business_email}
          phone={professional?.phone}
        />
      </div>
    ));
  }, [professionals, lang, filterProfessionals, isFilterActive]);
  const userTypes = [
    ...new Set(
      (isFilterActive ? filterProfessionals : professionals)?.map(
        (pro: any) => pro.user.user_type
      ) || []
    ),
  ];
  const updatedCountryOptions = countryOptions.map(
    (option: { label: string; value: number }) => ({
      label: option.label,
      id: option.value,
    })
  );
  const updatedcityOptions = cityOptionsFilter(selectedCountries).map(
    (option: { label: string; value: number }) => ({
      label: option.label,
      id: option.value,
    })
  );

  const isContractor = userTypes.includes(SERVICE_PROVIDER_CONTRACTOR);
  const isSupplier = userTypes.includes(SUPPLIER);
  return (
    <div className="min-h-[calc(100vh-80px)] bg-[#F6F7FC] pt-6">
      <main className="container mx-auto p-4">
        {!isSearchMode && (
          <SearchBox
            name="professionals"
            title={
              !isSupplier
                ? t("professionals.professionals")
                : t("professionals.suppliers") || "Bussiness users"
            }
            desc={
              !isSupplier
                ? t("professionals.professionals_desc")
                : t("professionals.suppliers_desc") ||
                  "Choose a Bussiness users"
            }
            onSearch={handleSearch}
            placeholder={
              !isSupplier
                ? t("professionals.search_placeholder")
                : t("professionals.search_placeholder_suppliers") ||
                  "seacrh for a bussiness user"
            }
          />
        )}
        <div className="grid grid-cols-3 md:grid-cols-4 gap-5">
          <aside className="col-span-1 flex flex-col gap-3">
            <CheckboxGroup
              title={t("job_bank.country")}
              options={updatedCountryOptions}
              selectedOptions={selectedCountries}
              onChange={setSelectedCountries}
            />
            <CheckboxGroup
              title={t("job_bank.city")}
              options={updatedcityOptions}
              selectedOptions={selectedCities}
              onChange={setSelectedCities}
              isCity
            />
            <CheckboxGroup
              title={t("professionals.years_of_experience")}
              options={YEARS_OF_EXPERIENCE}
              selectedOptions={selectedYearsOfExperience}
              onChange={setSelectedYearsOfExperience}
            />
            {parentServiceId !== FREELANCE_ID &&
              parentServiceId !== CRAFTSMEN_ID && (
                <CheckboxGroup
                  title={t("professionals.number_of_employees")}
                  options={NUMBER_OF_EMPLOYEES}
                  selectedOptions={selectedNumberOfEmployees}
                  onChange={setSelectedNumberOfEmployees}
                />
              )}
            <CheckboxGroup
              title={t("professionals.volum_of_work")}
              options={VOLUME_OF_WORK}
              selectedOptions={selectedVolumOfWork}
              onChange={setSelectedVolumOfWork}
            />
            {(isContractor || isSupplier) && (
              <CheckboxGroup
                title={t("professionals.classifications")}
                options={
                  isSupplier
                    ? SUPPLIER_CLASSIFICATIONS
                    : CONTRACTOR_CLASSIFICATIONS
                }
                selectedOptions={selectedClassifications}
                onChange={setSelectedClassifications}
              />
            )}
            <CheckboxGroup
              title={t("professionals.price_range")}
              options={PRICE_RANGE}
              selectedOptions={selectedPriceRange}
              onChange={setSelectedPriceRange}
            />
          </aside>
          <div className="h-fit col-span-2 md:col-span-3 lg:col-span-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {isLoadingProducts ? (
              <div className="mt-10 col-span-3">
                <Loader />
              </div>
            ) : (
              renderProducts
            )}
            {productsError && <ErrorMessage />}
          </div>
        </div>
        {!isLoadingProducts && (
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

export default Professionals;
