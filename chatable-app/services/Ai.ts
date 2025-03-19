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

import { PostMessageDto } from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class AiService<SecurityDataType = unknown> {
  http: HttpClient<SecurityDataType>;

  constructor(http: HttpClient<SecurityDataType>) {
    this.http = http;
  }

  /**
   * No description
   *
   * @tags AI
   * @name AiControllerGetChatHistory
   * @request GET:/ai/chat/history-messages
   * @secure
   */
  aiControllerGetChatHistory = (params: RequestParams = {}) =>
    this.http.request<void, any>({
      path: `/api/ai/chat/history-messages`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags AI
   * @name AiControllerChat
   * @request POST:/ai/chat
   * @secure
   */
  aiControllerChat = (data: PostMessageDto, params: RequestParams = {}) =>
    this.http.request<void, any>({
      path: `/api/ai/chat`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
}
