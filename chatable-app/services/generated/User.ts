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

import { CreateUserDto, GetProfileVo } from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class UserService<SecurityDataType = unknown> {
  http: HttpClient<SecurityDataType>;

  constructor(http: HttpClient<SecurityDataType>) {
    this.http = http;
  }

  /**
   * No description
   *
   * @tags User
   * @name UserControllerRegister
   * @request POST:/user
   */
  userControllerRegister = (data: CreateUserDto, params: RequestParams = {}) =>
    this.http.request<void, any>({
      path: `/user`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags User
   * @name UserControllerGetProfile
   * @request GET:/user/profile
   * @secure
   */
  userControllerGetProfile = (params: RequestParams = {}) =>
    this.http.request<any, GetProfileVo>({
      path: `/user/profile`,
      method: "GET",
      secure: true,
      ...params,
    });
}
