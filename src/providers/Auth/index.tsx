import axios, {
  AxiosInstance,
  AxiosRequestHeaders,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { ReactNode, createContext, useContext, useState } from "react";
import { FamilyRequest, LoginRequest, UserRequest } from "../../models";
import { IFamilyResponse, ILoginResponse, IUserResponse } from "../../types";

interface IAuthProviderProps {
  children: ReactNode;
}

interface IAuthProviderData {
  login: (request: LoginRequest) => void;
  createUser: (request: UserRequest) => void;
  logout: () => void;
  isAdminUser: () => boolean;
  isAuthenticatedUser: () => boolean;
  getToken: () => string;
  getEmail: () => string;
  getUserId: () => string;
  getFamilyId: () => string;
  setToken: (value: string) => void;
  isLoadingAuth: boolean;
  api: AxiosInstance;
}

export const _api = axios.create({
  baseURL: import.meta.env.VITE_URL_API as string,
});

export const AuthContext = createContext<IAuthProviderData>(
  {} as IAuthProviderData
);

export const AuthProvider = ({ children }: IAuthProviderProps) => {
  const [isLoadingAuth, setIsLoadingAuth] = useState<boolean>(false);

  const api = axios.create({
    baseURL: import.meta.env.VITE_URL_API as string,
  });

  const authRequestInterceptor = (config: InternalAxiosRequestConfig) => {
    if (!config.headers) {
      config.headers = {} as AxiosRequestHeaders;
    }

    if (getToken()) {
      config.headers.set("X-Handoven-User", getUserId());
      config.headers.set("X-Handoven-Family", getFamilyId());
      config.headers.set("X-Handoven-Service", false);
    }

    config.headers.Accept = "application/json";
    return config;
  };

  api.interceptors.request.use(authRequestInterceptor);

  const login = async (request: LoginRequest) => {
    setIsLoadingAuth(true);
    try {
      const { data }: AxiosResponse<ILoginResponse> = await _api.post(
        "user/login",
        request,
        {
          headers: {
            "Content-Type": "application/json",
            "X-HandOven-Service": false,
            "X-HandOven-Family": "111111111111111111111111",
            "X-HandOven-User": "111111111111111111111111",
          },
        }
      );

      window.localStorage.setItem("userId", data.id);
      window.localStorage.setItem("familyId", data.familyId);
      window.localStorage.setItem("token", "token");
      window.localStorage.setItem("email", data.email);
      setIsLoadingAuth(false);
    } catch (error) {
      console.error(error);
      setIsLoadingAuth(false);
    }
  };

  const createUser = async (request: UserRequest) => {
    const requestFamily = new FamilyRequest(request.familyName);
    const family = await createFamily(requestFamily);
    request.familyId = family.id;
    setIsLoadingAuth(true);
    try {
      const { data }: AxiosResponse<IUserResponse> = await _api.post(
        "user/addUser",
        request,
        {
          headers: {
            "Content-Type": "application/json",
            "X-HandOven-Service": false,
            "X-HandOven-Family": "111111111111111111111111",
            "X-HandOven-User": "111111111111111111111111",
          },
        }
      );
      window.localStorage.setItem("userId", data.id);
      window.localStorage.setItem("familyId", data.familyId);
      window.localStorage.setItem("email", data.email);
      window.localStorage.setItem("token", "token");
      setIsLoadingAuth(false);
    } catch (error) {
      console.error(error);
      setIsLoadingAuth(false);
    }
  };

  const createFamily = async (
    request: FamilyRequest
  ): Promise<IFamilyResponse> => {
    setIsLoadingAuth(true);
    let family;
    try {
      const { data }: AxiosResponse<IFamilyResponse> = await _api.post(
        "family",
        request,
        {
          headers: {
            "Content-Type": "application/json",
            "X-HandOven-Service": false,
            "X-HandOven-Family": "111111111111111111111111",
            "X-HandOven-User": "111111111111111111111111",
          },
        }
      );
      family = data;
      window.localStorage.setItem("familyId", data.id);
      setIsLoadingAuth(false);
    } catch (error) {
      console.error(error);
      setIsLoadingAuth(false);
    }

    return family as IFamilyResponse;
  };

  const logout = () => {
    window.localStorage.removeItem("userId");
    window.localStorage.removeItem("familyId");
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("email");
  };

  const getEmail = (): string => {
    return window.localStorage.getItem("email") as string;
  };

  const getToken = (): string => {
    return window.localStorage.getItem("token") as string;
  };

  const getUserId = (): string => {
    return window.localStorage.getItem("userId") as string;
  };

  const getFamilyId = (): string => {
    return window.localStorage.getItem("familyId") as string;
  };

  const setToken = (value: string): void => {
    window.localStorage.setItem("token", value);
  };

  const isAuthenticatedUser = (): boolean => {
    if (!getEmail().length && !getToken().length) {
      return false;
    }
    return true;
  };

  const isAdminUser = (): boolean => {
    const emailAdmin = import.meta.env.VITE_ADMIN_EMAIL as string;
    return getEmail() === emailAdmin;
  };

  return (
    <AuthContext.Provider
      value={{
        login,
        createUser,
        logout,
        isLoadingAuth,
        isAdminUser,
        getEmail,
        getToken,
        getUserId,
        getFamilyId,
        setToken,
        isAuthenticatedUser,
        api,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
