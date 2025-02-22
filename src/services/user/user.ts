import apiClient from "@/config/apiClient";
import userEndpoints from "@/config/endpoints/userEndpoints";
import { User } from "@/types/User";
const headers = {
  paginationItems: "15",
};

export const userProfile = () => {
  return apiClient.get<null, { data: { payload: User } }>(
    `${userEndpoints.profile}`
  );
};

export const businessUsers = async (userTypes: number[]) => {
  const queryParams: string[] = [];
  userTypes.forEach((userType, index) => {
    queryParams.push(`filters[user][user_type][$in][${index}]=${userType}`);
  });
  const queryString = queryParams.join("&");
  const response = await apiClient.get(
    `${userEndpoints.businessUserDetails}?${queryString}`,
    {
      headers,
    }
  );
  return response.data;
};

export const userServices = async (userId: string) => {
  const queryParams: string[] = [];
  queryParams.push(`filters[user_id][$eq]=${userId}`);
  const queryString = queryParams.join("&");
  const response = await apiClient.get(
    `${userEndpoints.userServices}?${queryString}`,
    {
      headers,
    }
  );
  return response.data;
};

export async function fetchBusinessinfo(userId: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/business-user-details?filters[user][users.id][$eq]=${userId}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch business user details");
  }
  return response.json();
}

export const fetchProfessionals = async ({
  page = 1,
  numberOfEmployees,
  volumOfWork,
  yearsOfExperience,
  serviceId,
  priceRanges,
}: any) => {
  const queryParams: string[] = [`page=${page}`];

  if (numberOfEmployees && numberOfEmployees.length > 0) {
    numberOfEmployees.forEach((numberOfEmployee: number, index: number) => {
      queryParams.push(
        `filters[number_of_employees][$in][${index}]=${numberOfEmployee}`
      );
    });
  }
  if (yearsOfExperience && yearsOfExperience.length > 0) {
    yearsOfExperience.forEach((yearsOfExperience: number, index: number) => {
      queryParams.push(
        `filters[years_of_experience][$in][${index}]=${yearsOfExperience}`
      );
    });
  }
  if (volumOfWork && volumOfWork.length > 0) {
    volumOfWork.forEach((volumOfWork: number, index: number) => {
      queryParams.push(`filters[volume_of_work][$in][${index}]=${volumOfWork}`);
    });
  }
  if (priceRanges && priceRanges.length > 0) {
    volumOfWork.forEach((priceRange: number, index: number) => {
      queryParams.push(`filters[price_range][$in][${index}]=${priceRange}`);
    });
  }

  const queryString = queryParams.join("&");
  const response = await apiClient.get(
    `${userEndpoints.getUserByServices}/${serviceId}/business-user?${queryString}`,
    {
      headers,
    }
  );
  return response.data;
};
export const FiltersProfessionals = async ({
  page,
  categoryId,
  searchQuery,
  numberOfEmployees,
  volumOfWork,
  yearsOfExperience,
  serviceId,
  priceRanges,
  classifications,
  showInJobBank,
  userTypes,
  countries,
  cities,
}: any) => {
  const queryParams: string[] = [`page=${page}`];
  if (showInJobBank) {
    queryParams.push(`filters[show_in_JB][$eq]=${1}`);
  }
  if (countries && countries.length > 0) {
    countries.forEach((country: number, index: number) => {
      queryParams.push(`filters[city][country_id][$in][${index}]=${country}`);
    });
  }
  if (cities && cities.length > 0) {
    cities.forEach((city: number, index: number) => {
      queryParams.push(
        `filters[business_user_details.city_id][$in][${index}]=${city}`
      );
    });
  }
  if (serviceId) {
    queryParams.push(`filters[services][services.id][$eq]=${serviceId}`);
  }
  if (categoryId) {
    queryParams.push(`category_id=${categoryId}`);
  }
  if (searchQuery) {
    queryParams.push(`search_text=${searchQuery}`);
  }
  if (categoryId) {
    queryParams.push(`category_id=${categoryId}`);
  }
  if (numberOfEmployees && numberOfEmployees.length > 0) {
    numberOfEmployees.forEach((numberOfEmployee: number, index: number) => {
      queryParams.push(
        `filters[number_of_employees][$in][${index}]=${numberOfEmployee}`
      );
    });
  }
  if (yearsOfExperience && yearsOfExperience.length > 0) {
    yearsOfExperience.forEach((yearsOfExperience: number, index: number) => {
      queryParams.push(
        `filters[years_of_experience][$in][${index}]=${yearsOfExperience}`
      );
    });
  }
  if (volumOfWork && volumOfWork.length > 0) {
    volumOfWork.forEach((volumOfWork: number, index: number) => {
      queryParams.push(`filters[volume_of_work][$in][${index}]=${volumOfWork}`);
    });
  }
  if (priceRanges && priceRanges.length > 0) {
    priceRanges.forEach((priceRange: number, index: number) => {
      queryParams.push(`filters[price_range][$in][${index}]=${priceRange}`);
    });
  }
  if (classifications && classifications.length > 0) {
    classifications.forEach((classification: number, index: number) => {
      queryParams.push(
        `filters[classifications][business_user_classifications.classification][$in][${index}]=${classification}`
      );
    });
  }
  if (userTypes !== undefined && userTypes.length) {
    userTypes.forEach((userType: [], index: number) => {
      queryParams.push(`filters[user_type][$in][${index}]=${userType}`);
    });
  }
  const queryString = queryParams.join("&");
  const response = await apiClient.get(
    `${userEndpoints.filterProfessionals}?${queryString}`,
    { headers }
  );
  return response.data;
};
export async function fetchBusinessBranches(userId: string) {
  const response = await apiClient.get(
    `${userEndpoints.getBranches}/${userId}/branches`,
    {
      headers,
    }
  );
  return response.data;
}

export const editUser = async (data: any) => {
  const { user_id } = data;
  const response = await apiClient.put(
    `${userEndpoints.editUser}/${user_id}`,
    data
  );
  return response.data;
};

export const getUser = async () => {
  const response = await apiClient.get(`${userEndpoints.getUser}`);
  return response.data.payload;
};
export const fetchBusinessUsers = async ({
  page = 1,
  numberOfEmployees,
  volumOfWork,
  yearsOfExperience,
  priceRanges,
  showInJobBank,
  userTypes,
}: any) => {
  const queryParams: string[] = [`page=${page}`];
  if (showInJobBank) {
    queryParams.push(`filters[show_in_JB][$eq]=${1}`);
  }

  if (numberOfEmployees && numberOfEmployees.length > 0) {
    numberOfEmployees.forEach((numberOfEmployee: number, index: number) => {
      queryParams.push(
        `filters[number_of_employees][$in][${index}]=${numberOfEmployee}`
      );
    });
  }
  if (yearsOfExperience && yearsOfExperience.length > 0) {
    yearsOfExperience.forEach((yearsOfExperience: number, index: number) => {
      queryParams.push(
        `filters[years_of_experience][$in][${index}]=${yearsOfExperience}`
      );
    });
  }
  if (volumOfWork && volumOfWork.length > 0) {
    volumOfWork.forEach((volumOfWork: number, index: number) => {
      queryParams.push(`filters[volume_of_work][$in][${index}]=${volumOfWork}`);
    });
  }
  if (priceRanges && priceRanges.length > 0) {
    volumOfWork.forEach((priceRange: number, index: number) => {
      queryParams.push(`filters[price_range][$in][${index}]=${priceRange}`);
    });
  }
  if (userTypes !== undefined && userTypes.length) {
    userTypes.forEach((userType: [], index: number) => {
      queryParams.push(`filters[user_type][$in][${index}]=${userType}`);
    });
  }
  const queryString = queryParams.join("&");
  const response = await apiClient.get(
    `${userEndpoints.businessUsers}?${queryString}`,
    {
      headers,
    }
  );
  return response.data;
};

export const fetchInterests = async (userId: string) => {
  const response = await apiClient.get(
    `${userEndpoints.interests}?filters[user_id][$eq]=${userId}`
  );
  return response.data.payload;
};

export const editInterests = async (data: any) => {
  const response = await apiClient.put(`${userEndpoints.interests}`, data);
  return response.data;
};

export const mutateEditBusinessUser = ({
  userData,
  userId,
}: {
  userData: any;
  userId: number;
}) => {
  const apiUrl = `${userEndpoints.businessUsers}/${userId}`;

  let headers = {
    "Content-Type": "application/json",
  };

  if (userData instanceof FormData) {
    headers = {
      "Content-Type": "multipart/form-data",
    };
    return apiClient.post(apiUrl, userData, { headers });
  }

  return apiClient.patch(apiUrl, userData, { headers });
};
