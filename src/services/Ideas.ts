import apiClient from "@/config/apiClient";
import ideasEndpoints from "@/config/endpoints/ideasEndpoints";

const headers = {
  paginationItems: "12",
};
export const Ideas = async ({ id, page = 1, ideaId, serviceId }: any) => {
  const queryParams: string[] = [`page=${page}`];

  if (ideaId) {
    queryParams.push(`filters[id][$eq]=${ideaId}`);
  }
  if (id) {
    queryParams.push(`filters[service][category_id][$eq]=${id}`);
  }
  if (serviceId) {
    queryParams.push(`filters[service][services.id][$eq]=${serviceId}`);
  }
  const queryString = queryParams.join("&");

  const response = await apiClient.get(
    `${ideasEndpoints.ideas}?${queryString}`,
    {
      headers,
    }
  );
  return response.data;
};

export const FiltersIdeas = async ({
  services,
  page,
  values,
  id,
  searchQuery,
  serviceId,
  subCategories,
  serviceProvidersTypes,
}: any) => {
  const queryParams: string[] = [`page=${page}`];
  if (serviceId) {
    queryParams.push(`filters[service][services.id][$eq]=${serviceId}`);
  }
  if (id) {
    queryParams.push(`filters[service][category_id][$eq]=${id}`);
  }
  if (searchQuery) {
    queryParams.push(`search_text=${searchQuery}`);
  }

  if (services && services.length > 0) {
    services.forEach((service: number, index: number) => {
      queryParams.push(
        `filters[service][services.id][$in][${index}]=${service}`
      );
    });
  }
  if (subCategories && subCategories.length > 0) {
    subCategories.forEach((subCategorie: number, index: number) => {
      queryParams.push(
        `filters[service][category_id][$in][[${index}]=${subCategorie}`
      );
    });
  }
  if (serviceProvidersTypes && serviceProvidersTypes.length > 0) {
    serviceProvidersTypes.forEach(
      (serviceProvidersType: number, index: number) => {
        queryParams.push(
          `filters[service][category][parent_id][$in][${index}]=${serviceProvidersType}`
        );
      }
    );
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
    `${ideasEndpoints.filtersIdeas}?${queryString}`,
    { headers }
  );
  return response.data;
};

export const SimilarIdeas = async ({ ideaId }: any) => {
  const response = await apiClient.get(
    `${ideasEndpoints.ideas}/${ideaId}/similars`
  );

  return response.data;
};
