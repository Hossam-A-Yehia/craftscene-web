import apiClient from "@/config/apiClient";
import projectsEndpoints from "@/config/endpoints/projectsEndpoints";

export const getProjects = async (businessId: string) => {
  const response = await apiClient.get(
    `${projectsEndpoints.projects}/${businessId}/projects`
  );
  return response.data;
};
export const getProject = async (id: string) => {
  const response = await apiClient.get(`${projectsEndpoints.project}/${id}`);
  return response.data;
};
