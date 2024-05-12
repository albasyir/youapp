/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface RegistrationRequestDto {
  /**
   * used to as user identifier
   * @example "aziz"
   */
  username: string;
  /**
   * user email
   * @example "abdulazizalbasyir119@gmail.com"
   */
  email: string;
  /**
   * to authenticate user
   * @example "user-password"
   */
  password: string;
}

export interface RegistrationResponseDto {
  user: {
    id: string;
    username: string;
    email: string;
  };
  token: string;
}

export interface LoginRequestDto {
  /**
   * can be email / username
   * @example "aziz"
   */
  identifier: string;
  /**
   * some secret random user identity verificator
   * @example "user-password"
   */
  password: string;
}

export interface LoginResponseDto {
  user: {
    id: string;
    username: string;
    email: string;
  };
  token: string;
}

export interface GetProfileResponse {
  /**
   * used to as user identifier
   * @example "aziz"
   */
  username: string;
  /**
   * user email
   * @example "abdulazizalbasyir119@gmail.com"
   */
  email: string;
  /**
   * display name of the user
   * @example "Aziz"
   */
  displayName?: string;
  /**
   * gender of the user
   * @example "male"
   */
  gender?: GetProfileResponseGenderEnum;
  /**
   * birthday of the user
   * @format date-time
   * @example "1998-11-08"
   */
  birthday?: string;
  /**
   * height of the user
   * @example 180
   */
  height?: number;
  /**
   * weight of the user
   * @example 70
   */
  weight?: number;
  /**
   * profile image of the user
   * @example "base64:xxxx"
   */
  image?: string;
  _id: string;
  __v?: number;
  horoscope: string;
  zodiac: string;
}

export interface PatchProfileRequestDto {
  /**
   * display name of the user
   * @example "Aziz"
   */
  displayName?: string;
  /**
   * gender of the user
   * @example "male"
   */
  gender?: PatchProfileRequestDtoGenderEnum;
  /**
   * birthday of the user
   * @format date-time
   * @example "1998-11-08"
   */
  birthday?: string;
  /**
   * height of the user
   * @example 180
   */
  height?: number;
  /**
   * weight of the user
   * @example 70
   */
  weight?: number;
  /**
   * profile image of the user
   * @example "base64:xxxx"
   */
  image?: string;
}

export interface BadRequestError {
  /** information which data was fail */
  property?: string;
  /** data problem that was facing */
  concerns?: string;
}

export interface HttpException {
  /** normal http status code that reflacted with our header */
  statusCode: number;
  /** message from service */
  message: string;
  /** <b>maybe</b> contains error(s) detail description for spesifict error content(s) ex. bad request */
  errors?: {
    /** information which data was fail */
    property?: string;
    /** data problem that was facing */
    concerns?: string;
  }[];
}

/**
 * gender of the user
 * @example "male"
 */
export enum GetProfileResponseGenderEnum {
  Male = "male",
  Female = "female",
}

/**
 * gender of the user
 * @example "male"
 */
export enum PatchProfileRequestDtoGenderEnum {
  Male = "male",
  Female = "female",
}

export type RegistrationData = RegistrationResponseDto;

export type SignInData = LoginResponseDto;

export type GetData = GetProfileResponse;

export type PatchData = GetProfileResponse;

import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, HeadersDefaults, ResponseType } from "axios";
import axios from "axios";

export type QueryParamsType = Record<string | number, any>;

export interface FullRequestParams extends Omit<AxiosRequestConfig, "data" | "params" | "url" | "responseType"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseType;
  /** request body */
  body?: unknown;
}

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;

export interface ApiConfig<SecurityDataType = unknown> extends Omit<AxiosRequestConfig, "data" | "cancelToken"> {
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
  secure?: boolean;
  format?: ResponseType;
}

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public instance: AxiosInstance;
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private secure?: boolean;
  private format?: ResponseType;

  constructor({ securityWorker, secure, format, ...axiosConfig }: ApiConfig<SecurityDataType> = {}) {
    this.instance = axios.create({ ...axiosConfig, baseURL: axiosConfig.baseURL || "" });
    this.secure = secure;
    this.format = format;
    this.securityWorker = securityWorker;
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected mergeRequestParams(params1: AxiosRequestConfig, params2?: AxiosRequestConfig): AxiosRequestConfig {
    const method = params1.method || (params2 && params2.method);

    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...((method && this.instance.defaults.headers[method.toLowerCase() as keyof HeadersDefaults]) || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected stringifyFormItem(formItem: unknown) {
    if (typeof formItem === "object" && formItem !== null) {
      return JSON.stringify(formItem);
    } else {
      return `${formItem}`;
    }
  }

  protected createFormData(input: Record<string, unknown>): FormData {
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key];
      const propertyContent: any[] = property instanceof Array ? property : [property];

      for (const formItem of propertyContent) {
        const isFileType = formItem instanceof Blob || formItem instanceof File;
        formData.append(key, isFileType ? formItem : this.stringifyFormItem(formItem));
      }

      return formData;
    }, new FormData());
  }

  public request = async <T = any, _E = any>({
    secure,
    path,
    type,
    query,
    format,
    body,
    ...params
  }: FullRequestParams): Promise<AxiosResponse<T>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const responseFormat = format || this.format || undefined;

    if (type === ContentType.FormData && body && body !== null && typeof body === "object") {
      body = this.createFormData(body as Record<string, unknown>);
    }

    if (type === ContentType.Text && body && body !== null && typeof body !== "string") {
      body = JSON.stringify(body);
    }

    return this.instance.request({
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type && type !== ContentType.FormData ? { "Content-Type": type } : {}),
      },
      params: query,
      responseType: responseFormat,
      data: body,
      url: path,
    });
  };
}

/**
 * @title YouApp By Aziz
 * @version latest
 * @contact Your Next Candidate: Aziz <@abdulazizalbasyir119@gmail.com> (https://www.linkedin.com/in/albasyir/)
 *
 * Your next candidate here
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  auth = {
    /**
     * No description
     *
     * @tags auth
     * @name Registration
     * @request POST:/auth/register
     * @response `201` `RegistrationData`
     */
    registration: (data: RegistrationRequestDto, params: RequestParams = {}) =>
      this.request<RegistrationData, any>({
        path: `/auth/register`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags auth
     * @name SignIn
     * @request POST:/auth/login
     * @response `202` `SignInData`
     */
    signIn: (data: LoginRequestDto, params: RequestParams = {}) =>
      this.request<SignInData, any>({
        path: `/auth/login`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),
  };
  profile = {
    /**
     * No description
     *
     * @tags profile
     * @name Get
     * @request GET:/profile
     * @secure
     * @response `200` `GetData`
     */
    get: (params: RequestParams = {}) =>
      this.request<GetData, any>({
        path: `/profile`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags profile
     * @name Patch
     * @request PATCH:/profile
     * @secure
     * @response `202` `PatchData`
     */
    patch: (data: PatchProfileRequestDto, params: RequestParams = {}) =>
      this.request<PatchData, any>({
        path: `/profile`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),
  };
}
