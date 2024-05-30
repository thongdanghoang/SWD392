import {AuthContextProps} from 'oidc-react';
import axios, {AxiosInstance} from 'axios';
import {UserDto} from '../models/userDto.ts';
import {ApplicationConstants} from '../application.constants.ts';

class ApplicationService {
  private static instance: ApplicationService;
  private auth: AuthContextProps | null = null;

  private constructor() {}

  public static getInstance(): ApplicationService {
    if (!ApplicationService.instance) {
      ApplicationService.instance = new ApplicationService();
    }
    return ApplicationService.instance;
  }

  public setAuth(auth: AuthContextProps): void {
    this.auth = auth;
  }

  public async fetchCurrentUser(): Promise<UserDto> {
    const apiClient: AxiosInstance = this.createApiClient();
    const response = await apiClient.get(
      `${ApplicationConstants.API_URL}/user`
    );
    return response.data;
  }

  public signOutRedirect(): void {
    if (this.auth) {
      this.auth
        .signOutRedirect()
        .then(() => {
          alert('Successfully logged out');
        })
        .catch(error => {
          alert(error);
        });
    }
  }

  public isAuthenticated(): boolean {
    return !!this.auth?.userData;
  }

  public createApiClient(): AxiosInstance {
    const apiClient: AxiosInstance = axios.create();
    const accessToken: string | undefined = this.auth?.userData?.access_token;

    apiClient.interceptors.request.use(
      config => {
        if (accessToken) {
          config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
      },
      error => {
        return Promise.reject(error);
      }
    );

    return apiClient;
  }
}

export default ApplicationService;
