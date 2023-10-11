import axios, {InternalAxiosRequestConfig, AxiosRequestHeaders} from "axios";
import {useAuth} from "../providers/Auth";

export const api = axios.create({
  baseURL: import.meta.env.VITE_URL_API as string,
});

const authRequestInterceptor = (config: InternalAxiosRequestConfig) => {
  const {getToken, getUserId, getFamilyId} = useAuth();

  if (!config.headers) {
    config.headers = {} as AxiosRequestHeaders
  }

  if (getToken()) {
    config.headers.set("X-Handoven-User", getUserId())
    config.headers.set("X-Handoven-Family", getFamilyId())
    config.headers.set("X-Handoven-Service", false)
  }

  config.headers.Accept = "application/json";
  return config;
};

api.interceptors.request.use(authRequestInterceptor);
