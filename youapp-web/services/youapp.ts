import { Api, HttpException } from "sdk/youapp-service";
import { AxiosError } from "axios";

export const youappService = new Api({
  baseURL: "http://localhost:3000"
});

youappService.instance.interceptors.request.use((config) => {
  if (!window) throw Error("this module need to be upgrade to SSR support");

  let token: string | null = window.localStorage.getItem("token");

  if (token) {
    config.headers['Authorization'] = "Barier " + token
  }

  return config;
});

export type YouAppServiceError = AxiosError<HttpException>;