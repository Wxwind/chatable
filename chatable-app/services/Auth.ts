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

import { CreateUserDto, CreateUserVo, LoginDto, LoginVo } from "./data-contracts";
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
   * @name AuthControllerLogin
   * @request POST:/auth/login
   */
  authControllerLogin = (data: LoginDto, params: RequestParams = {}) =>
    this.http.request<LoginVo, any>({
      path: `/api/auth/login`,
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
    this.http.request<CreateUserVo, any>({
      path: `/api/auth/register`,
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
   * @name AuthControllerGetProfile
   * @request GET:/auth/profile
   * @secure
   */
  authControllerGetProfile = (params: RequestParams = {}) =>
    this.http.request<void, any>({
      path: `/api/auth/profile`,
      method: "GET",
      secure: true,
      ...params,
    });
}
