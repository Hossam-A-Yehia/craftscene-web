"use client";
import React, { useState, useEffect, useMemo } from "react";
import SearchBox from "@/components/molecules/SearchBox/SearchBox";
import { CheckboxGroup } from "@/components/molecules/CheckboxGroup/CheckboxGroup";
import Loader from "@/components/atoms/Loader/Loader";
import ErrorMessage from "@/components/atoms/ErrorMessage/ErrorMessage";
import Pagination from "@/components/molecules/Pagination/Pagination";
import { t } from "i18next";
import {
  useFetchbusinessUsers,
  useFetchFilterProfessionals,
} from "@/hooks/useUser";
import NoData from "@/components/molecules/NoDate/NoDate";
import {
  PRICE_RANGE,
  SERVICE_PROVIDER_CRAFTSMEN,
  SERVICE_PROVIDER_FREELANCE,
  VOLUME_OF_WORK,
  YEARS_OF_EXPERIENCE,
} from "@/constants/constants";
import JobBankCard from "@/components/molecules/JobBankCard/JobBankCard";
import { BusinessInfoType } from "@/types/User";
import { CategoriesData } from "@/types/Organisms";
import { useFetchServices } from "@/hooks/useServices";
import { useCountryData } from "@/hooks/useCountryData";

const JobBank = ({ categoriesData }: { categoriesData: any }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedYearsOfExperience, setSelectedYearsOfExperience] = useState<
    number[]
  >([]);
  const [selectedVolumOfWork, setSelectedVolumOfWork] = useState<number[]>([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState<number[]>([]);
  const [selectedServiceProvidersTypes, setSelectedServiceProvidersTypes] =
    useState<number[]>([]);
  const [selectedServices, setSelectedServices] = useState<number[]>([]);
  const [selectedCountries, setSelectedCountries] = useState<number[]>([]);
  const [selectedCities, setSelectedCities] = useState<number[]>([]);

  const { countryOptions, cityOptionsFilter } = useCountryData();
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
  const isFilterActive =
    selectedYearsOfExperience.length > 0 ||
    selectedVolumOfWork.length > 0 ||
    selectedCities.length > 0 ||
    selectedCountries.length > 0 ||
    searchQuery.length > 0;

  const {
    data: businessUsersData,
    isLoading,
    error,
  } = useFetchbusinessUsers(
    {
      page: currentPage,
      volumOfWork: selectedVolumOfWork,
      yearsOfExperience: selectedYearsOfExperience,
      priceRanges: selectedPriceRange,
      showInJobBank: true,
      userTypes: [SERVICE_PROVIDER_CRAFTSMEN, SERVICE_PROVIDER_FREELANCE],
    },
    !isFilterActive
  );
  const { data: filterBusinessUsersData } = useFetchFilterProfessionals(
    {
      page: currentPage,
      searchQuery: searchQuery,
      volumOfWork: selectedVolumOfWork,
      yearsOfExperience: selectedYearsOfExperience,
      priceRanges: selectedPriceRange,
      showInJobBank: true,
      cities: selectedCities,
      countries: selectedCountries,
      userTypes: [SERVICE_PROVIDER_CRAFTSMEN, SERVICE_PROVIDER_FREELANCE],
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
  const categories = useMemo(
    () =>
      categoriesData?.payload?.filter(
        (category: CategoriesData) =>
          category.name_en === "Craftsman" ||
          category.name_en === "Design-Freelancer"
      ),
    [categoriesData]
  );

  const { data: servicesData, isLoading: isLoadingServices } = useFetchServices(
    {
      paginate: false,
      type: 1,
      businessTypes: selectedServiceProvidersTypes,
    }
  );
  const businessUsers = useMemo(
    () => businessUsersData?.payload.data ?? [],
    [businessUsersData]
  );

  const filterBusinessUsers = useMemo(
    () => filterBusinessUsersData?.payload?.results?.data ?? [],
    [filterBusinessUsersData]
  );
  const lastPage = isFilterActive
    ? filterBusinessUsersData?.payload?.results?.last_page
    : businessUsersData?.payload?.last_page;
  const renderProducts = useMemo(() => {
    const data = isFilterActive ? filterBusinessUsers : businessUsers;
    if (data.length === 0 && !error) {
      return (
        <div className="col-span-3 w-1/2 mx-auto mt-5" data-testid="no-data">
          <NoData />
        </div>
      );
    }
    return data.map((businessUser: BusinessInfoType) => (
      <div key={businessUser.id} className="col-span-1">
        <JobBankCard
          id={businessUser?.user?.id}
          profileImage={businessUser?.profile}
          logo={businessUser?.logo}
          name={`${businessUser?.user?.first_name} ${businessUser?.user?.last_name}`}
          files={businessUser?.files}
        />
      </div>
    ));
  }, [businessUsers, filterBusinessUsers, isFilterActive, error]);
  return (
    <div className="min-h-[calc(100vh-80px)] bg-[#F6F7FC] pt-6">
      <main className="container mx-auto p-4">
        <SearchBox
          name="professionals"
          title={t("job_bank.title")}
          desc={t("job_bank.job_bank_desc")}
          onSearch={handleSearch}
          placeholder={t("job_bank.search_placeholder")}
        />
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
              title={t("ideas.service_providers_type")}
              options={categories}
              selectedOptions={selectedServiceProvidersTypes}
              onChange={setSelectedServiceProvidersTypes}
            />
            <CheckboxGroup
              title={t("ideas.services")}
              options={servicesData?.payload}
              selectedOptions={selectedServices}
              onChange={setSelectedServices}
              isLoading={isLoadingServices}
            />
            <CheckboxGroup
              title={t("job_bank.years_of_experience")}
              options={YEARS_OF_EXPERIENCE}
              selectedOptions={selectedYearsOfExperience}
              onChange={setSelectedYearsOfExperience}
            />
            <CheckboxGroup
              title={t("job_bank.volum_of_work")}
              options={VOLUME_OF_WORK}
              selectedOptions={selectedVolumOfWork}
              onChange={setSelectedVolumOfWork}
            />
            <CheckboxGroup
              title={t("job_bank.price_range")}
              options={PRICE_RANGE}
              selectedOptions={selectedPriceRange}
              onChange={setSelectedPriceRange}
            />
          </aside>
          <div className="h-fit col-span-2 md:col-span-3 lg:col-span-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {isLoading ? (
              <div className="mt-10 col-span-3" data-testid="loader-wrapper">
                <Loader />
              </div>
            ) : (
              renderProducts
            )}
            {error && (
              <div
                className="col-span-3 w-1/2 mx-auto mt-5"
                data-testid="error-message"
              >
                <ErrorMessage />
              </div>
            )}
          </div>
        </div>
        {!isLoading && (
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

export default JobBank;
