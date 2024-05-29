import {AuthContextProps, useAuth} from 'oidc-react';
import axios, {AxiosInstance} from 'axios';
import {UserDto} from '../models/userDto.ts';
import {ApplicationConstants} from '../application.constants.ts';

class ApplicationService {
  private readonly auth: AuthContextProps = useAuth();
  private currentUser: UserDto | null = null;

  public getCurrentUser(): UserDto | null {
    return this.currentUser;
  }

  public async fetchCurrentUser(): Promise<void> {
    const apiClient = this.getApiClient();
    const response = await apiClient.get(
      `${ApplicationConstants.API_URL}/user`
    );
    this.currentUser = response.data;
  }

  public signOutRedirect(): void {
    this.auth
      .signOutRedirect()
      .then(() => {
        alert('Successfully logged out');
      })
      .catch(error => {
        alert(error);
      });
  }

  public getApiClient(): AxiosInstance {
    const accessToken: string | undefined = this.auth.userData?.access_token;
    if (!accessToken) throw new Error('Access token is not available');
    return this.createApiClient(accessToken);
  }

  public isAuthenticated(): boolean {
    return !!this.auth?.userData;
  }

  private createApiClient(accessToken: string | undefined): AxiosInstance {
    const apiClient: AxiosInstance = axios.create();

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
