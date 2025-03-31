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

import { CreateUserDto, LoginDto, LoginVo } from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class AuthService<SecurityDataType = unknown> {
  http: HttpClient<SecurityDataType>;

  constructor(http: HttpClient<SecurityDataType>) {
    this.http = http;
  }

  /**
   * No description
   *
   * @tags Auth
   * @name AuthControllerLoginByGithub
   * @request POST:/auth/github/login
   * @secure
   */
  authControllerLoginByGithub = (params: RequestParams = {}) =>
    this.http.request<void, any>({
      path: `/auth/github/login`,
      method: "POST",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags Auth
   * @name AuthControllerLoginByGithubCallback
   * @request GET:/auth/github/login/callback
   */
  authControllerLoginByGithubCallback = (
    query: {
      code: string;
      state: string;
    },
    params: RequestParams = {},
  ) =>
    this.http.request<LoginVo, any>({
      path: `/auth/github/login/callback`,
      method: "GET",
      query: query,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Auth
   * @name AuthControllerBindGithub
   * @request POST:/auth/github/bind
   */
  authControllerBindGithub = (params: RequestParams = {}) =>
    this.http.request<void, any>({
      path: `/auth/github/bind`,
      method: "POST",
      ...params,
    });
  /**
   * No description
   *
   * @tags Auth
   * @name AuthControllerLogin
   * @request POST:/auth/login
   */
  authControllerLogin = (data: LoginDto, params: RequestParams = {}) =>
    this.http.request<LoginVo, any>({
      path: `/auth/login`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Auth
   * @name AuthControllerRegister
   * @request POST:/auth/register
   */
  authControllerRegister = (data: CreateUserDto, params: RequestParams = {}) =>
    this.http.request<void, any>({
      path: `/auth/register`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags Auth
   * @name AuthControllerGetProfile
   * @request GET:/auth/profile
   * @secure
   */
  authControllerGetProfile = (params: RequestParams = {}) =>
    this.http.request<void, any>({
      path: `/auth/profile`,
      method: "GET",
      secure: true,
      ...params,
    });
}
