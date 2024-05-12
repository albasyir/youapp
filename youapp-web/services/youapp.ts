import { Api, HttpException, LoginResponseDto } from "sdk/youapp-service";
import { AxiosError } from "axios";

export const youappService = new Api({
  baseURL: "http://localhost:3000"
});

youappService.instance.interceptors.request.use((config) => {
  if (!window) throw Error("this module need to be upgrade to SSR support");

  const userStringtified = window.localStorage.getItem("user");

  if (userStringtified) {
    let user: LoginResponseDto = JSON.parse(userStringtified);

    if (user) {
      config.headers['Authorization'] = "Bearer " + user.token
    }
  }

  return config;
});

export type YouAppServiceError = AxiosError<HttpException>;