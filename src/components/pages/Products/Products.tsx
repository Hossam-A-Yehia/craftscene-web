"use client";
import React, { useState, useEffect, useMemo } from "react";
import SearchBox from "@/components/molecules/SearchBox/SearchBox";
import {
  CheckboxGroup,
  CheckboxGroupForValues,
} from "@/components/molecules/CheckboxGroup/CheckboxGroup";
import { useQuery } from "@/hooks/useQuery";
import Loader from "@/components/atoms/Loader/Loader";
import ErrorMessage from "@/components/atoms/ErrorMessage/ErrorMessage";
import Pagination from "@/components/molecules/Pagination/Pagination";
import { useFetchServices } from "@/hooks/useServices";
import { useLanguage } from "@/hooks/useLanguage";
import { useParams } from "next/navigation";

import {
  Attribute,
  OptionType,
  ServicePayload,
  ValuesOptionType,
} from "@/types/Ideas";
import { t } from "i18next";
import NoDataSection from "@/components/molecules/NoDate/NoDate";
import { useFetchFilterProducts, useFetchProducts } from "@/hooks/useProducts";
import ProductCard from "@/components/molecules/ProductCard/ProductCard";
import { Product } from "@/types/Products";
const Products = ({
  isSearchMode,
  searchQueryFromCategories,
  categoryId,
  categories,
  selectedCategories,
  setSelectedCategories,
  productsServices,
}: {
  isSearchMode?: boolean;
  searchQueryFromCategories?: string;
  categoryId?: string;
  selectedCategories?: number[];
  setSelectedCategories?: any;
  productsServices?: any;
  categories?: {
    id?: string;
    name_en: string;
    [key: `name_${string}`]: string | undefined;
    images: { url: string }[];
  }[];
}) => {
  const params = useParams();
  const serviceId = params ? params.serviceId : null;
  const queryParams = useQuery();
  const lang = useLanguage();
  const [selectedValues, setSelectedValues] = useState<ValuesOptionType[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedServices, setSelectedServices] = useState<number[]>([]);

  const {
    data: productsData,
    isLoading: isLoadingProducts,
    error: productsError,
  } = useFetchProducts(
    {
      ...queryParams,
      values: selectedValues,
      page: currentPage,
      search: searchQuery,
      serviceId,
    },
    selectedValues.length === 0
  );

  useEffect(() => {
    setCurrentPage(1);
    setSelectedServices([]);
  }, [selectedValues, selectedCategories]);
  const handlePageChange = (page: number) => {
    if (page > 0 && page <= lastPage) setCurrentPage(page);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const { data: filterProductsData } = useFetchFilterProducts(
    {
      ...queryParams,
      values: selectedValues,
      page: currentPage,
      serviceId,
      searchQuery: searchQueryFromCategories || searchQuery,
      categoryId,
      categories: selectedCategories,
      services: selectedServices,
    },
    selectedValues.length > 0 ||
      searchQuery.length > 0 ||
      (searchQueryFromCategories?.length ?? 0) > 0
  );
  const { data: servicesData, isLoading: isLoadingServices } = useFetchServices(
    {
      paginate: false,
      type: 2,
      id: serviceId,
      subCategories: selectedCategories,
    }
  );

  const products = useMemo(
    () => productsData?.payload.data ?? [],
    [productsData]
  );
  const filterProducts = useMemo(
    () => filterProductsData?.payload?.results?.data ?? [],
    [filterProductsData]
  );
  const lastPage =
    filterProducts?.length === 0 &&
    searchQuery.length === 0 &&
    (searchQueryFromCategories?.length ?? 0) === 0
      ? productsData?.payload?.last_page
      : filterProductsData?.payload.results.last_page;

  const renderProducts = useMemo(() => {
    const data =
      selectedValues.length > 0 ||
      searchQuery.length > 0 ||
      (searchQueryFromCategories?.length ?? 0) > 0
        ? filterProducts
        : products;
    if (data.length === 0) {
      return (
        <div className="col-span-3 w-1/2 mx-auto mt-5">
          <NoDataSection />
        </div>
      );
    }
    return data.map((product: Product) => (
      <div key={product.id} className="col-span-1">
        <ProductCard
          imageUrl={product.images[0]?.url}
          altText={product.title_en}
          link={`/products/${product.id}`}
          title={product[`title_${lang}`] || product[`title_en`] || ""}
          supplier={product?.user?.business_user_detail?.business_name}
        />
      </div>
    ));
  }, [
    products,
    selectedValues,
    lang,
    filterProducts,
    searchQuery.length,
    searchQueryFromCategories?.length,
  ]);

  const allAttributes = useMemo<Attribute[]>(
    () =>
      productsServices && productsServices?.length !== 0
        ? productsServices?.flatMap(
            (service: ServicePayload) => service.attributes
          ) ?? []
        : servicesData?.payload?.flatMap(
            (service: ServicePayload) => service.attributes
          ) ?? [],
    [servicesData, productsServices]
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

  return (
    <div className="min-h-[calc(100vh-80px)] bg-[#F6F7FC] pt-6">
      <main className="container mx-auto p-4">
        {!isSearchMode && (
          <SearchBox
            name="products"
            title={t("products.products")}
            desc={t("products.products_desc")}
            onSearch={handleSearch}
            placeholder={t("products.search_placeholder")}
          />
        )}
        <div className="grid grid-cols-3 md:grid-cols-4 gap-5">
          <aside className="col-span-1 flex flex-col gap-3">
            {isSearchMode && (
              <>
                {categories && (
                  <CheckboxGroup
                    title={t("ideas.categories")}
                    options={categories}
                    opened
                    selectedOptions={selectedCategories}
                    onChange={setSelectedCategories}
                  />
                )}
                {selectedCategories?.length !== 0 ||
                (productsServices && productsServices?.length !== 0) ? (
                  <CheckboxGroup
                    title={t("ideas.services")}
                    options={
                      productsServices?.length !== 0 && productsServices
                        ? productsServices
                        : servicesData?.payload
                    }
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

export default Products;
