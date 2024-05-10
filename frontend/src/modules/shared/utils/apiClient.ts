import axios, { AxiosInstance } from "axios";

export function createApiClient(accessToken: string | undefined): AxiosInstance {
  const apiClient: AxiosInstance = axios.create();

  apiClient.interceptors.request.use((config) => {
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  }, (error) => {
    return Promise.reject(error);
  });

  return apiClient;
}