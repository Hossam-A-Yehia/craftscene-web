import apiClient from "@/config/apiClient";
import productsEndpoints from "@/config/endpoints/productsEndpoints";

const headers = {
  paginationItems: "12",
};
export const Products = async ({
  id,
  page,
  search,
  productId,
  values,
  serviceId,
}: any) => {
  const queryParams: string[] = [`page=${page}`];

  if (productId) {
    queryParams.push(`filters[id][$eq]=${productId}`);
  }
  if (id) {
    queryParams.push(`filters[service][category_id][$eq]=${id}`);
  }
  if (serviceId) {
    queryParams.push(`filters[service][services.id][$eq]=${serviceId}`);
  }
  if (search) {
    queryParams.push(`filters[title_en][$contains]=${search}`);
  }

  if (values && values.length > 0) {
    values.forEach(
      (value: { attributesId: number; name_en: string }, index: number) => {
        queryParams.push(
          `criterias[${index}][attribute_id]=${
            value.attributesId
          }&criterias[${index}][value]=${encodeURIComponent(value.name_en)}`
        );
      }
    );
  }
  const queryString = queryParams.join("&");

  const response = await apiClient.get(
    `${productsEndpoints.products}?${queryString}`,
    {
      headers,
    }
  );
  return response.data;
};

export const FiltersProducts = async ({
  services,
  page,
  values,
  categoryId,
  searchQuery,
  serviceId,
  categories,
}: any) => {
  const queryParams: string[] = [`page=${page}`];
  if (serviceId) {
    queryParams.push(`filters[service][services.id][$eq]=${serviceId}`);
  }
  if (searchQuery) {
    queryParams.push(`search_text=${searchQuery}`);
  }
  if (categoryId) {
    queryParams.push(`category_id=${categoryId}`);
  }
  if (services && services.length > 0) {
    services.forEach((service: number, index: number) => {
      queryParams.push(
        `filters[service][services.id][$in][${index}]=${service}`
      );
    });
  }
  if (categories && categories.length > 0) {
    categories.forEach((categorie: number, index: number) => {
      queryParams.push(
        `filters[service][category_id][$in][${index}]=${categorie}`
      );
    });
  }
  if (values && values.length > 0) {
    values.forEach(
      (value: { attributesId: number; name_en: string }, index: number) => {
        queryParams.push(
          `criterias[${index}][attribute_id]=${
            value.attributesId
          }&criterias[${index}][value]=${encodeURIComponent(value.name_en)}`
        );
      }
    );
  }

  const queryString = queryParams.join("&");
  const response = await apiClient.get(
    `${productsEndpoints.filterProducts}?${queryString}`,
    { headers }
  );
  return response.data;
};
export const getProduct = async (id: string) => {
  const response = await apiClient.get(
    `${productsEndpoints.products}?filters[id][$eq]=${id}`
  );
  return response.data;
};

export const getVariants = async (id: string) => {
  const response = await apiClient.get(
    `${productsEndpoints.product}/${id}/attributes`
  );
  return response.data;
};

export const SimilarProducts = async ({ productId }: any) => {
  const response = await apiClient.get(
    `${productsEndpoints.products}/${productId}/similars`
  );

  return response.data;
};
