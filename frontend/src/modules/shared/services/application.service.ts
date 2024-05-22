import { AuthContextProps, useAuth } from "oidc-react";
import axios, { AxiosInstance } from "axios";
import { UserDto } from "../models/userDto.ts";

class ApplicationService {
  private auth: AuthContextProps = useAuth();
  private currentUser: UserDto|null = null;

  constructor() {
    void this.init();
  }

  public getCurrentUser(): UserDto|null {
    return this.currentUser;
  }

  public async fetchCurrentUser(): Promise<UserDto> {
    const apiClient = this.getApiClient();
    const response = await apiClient.get('/user');
    return response.data;
  }

  public signOutRedirect(): void {
    this.auth.signOutRedirect()
      .then(() => {
        console.log('Successfully logged out');
      })
      .catch((error) => {
        console.error('Error during sign out:', error);
      });
  }

  public getApiClient(): AxiosInstance {
    const accessToken: string | undefined = this.auth.userData?.access_token;
    return this.createApiClient(accessToken);
  }

  public isAuthenticated() {
    return (this.auth && this.auth.userData);
  }

  private async init() {
    this.currentUser = await this.fetchCurrentUser();
  }

  private createApiClient(accessToken: string | undefined): AxiosInstance {
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
}

export default ApplicationService;