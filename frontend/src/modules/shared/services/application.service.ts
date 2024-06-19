import {AuthContextProps, useAuth} from 'oidc-react';
import axios, {AxiosInstance} from 'axios';
import {UserDto} from '../models/userDto.ts';
import {AppRoutingConstants} from '../app-routing.constants.ts';
import {
  useStartLoading,
  useStopLoading
} from '../components/loading/LoadingUtils.tsx';

class ApplicationService {
  private readonly auth: AuthContextProps;
  private readonly startLoading: () => void;
  private readonly stopLoading: () => void;

  constructor(
    auth: AuthContextProps,
    startLoading: () => void,
    stopLoading: () => void
  ) {
    this.auth = auth;
    this.startLoading = startLoading;
    this.stopLoading = stopLoading;
  }

  public async fetchCurrentUser(): Promise<UserDto> {
    const apiClient: AxiosInstance = this.createApiClient();
    const response = await apiClient.get(AppRoutingConstants.CURRENT_USER_PATH);
    return response.data;
  }

  public signIn(): void {
    void this.auth?.signIn();
  }

  public signOutRedirect(): void {
    void this.createApiClient()
      .get(AppRoutingConstants.LOGOUT_PATH)
      .then((): void => {
        void this.auth
          ?.signOutRedirect()
          .then(() => {
            alert('Successfully logged out');
          })
          .catch(error => {
            alert(error);
          });
      });
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
        config.headers['Cache-Control'] = 'no-cache';
        this.startLoading();
        return config;
      },
      error => {
        this.stopLoading();
        return Promise.reject(error);
      }
    );

    apiClient.interceptors.response.use(
      response => {
        this.stopLoading();
        return response;
      },
      error => {
        this.stopLoading();
        return Promise.reject(error);
      }
    );

    return apiClient;
  }
}

export function useApplicationService(): ApplicationService {
  const auth: AuthContextProps = useAuth();
  const startLoading = useStartLoading() || ((): void => {});
  const stopLoading = useStopLoading() || ((): void => {});
  return new ApplicationService(auth, startLoading, stopLoading);
}
