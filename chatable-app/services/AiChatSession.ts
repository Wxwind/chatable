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

import { CreateSessionDto, CreateSessionVo, GetSessionsVo } from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class AiChatSessionService<SecurityDataType = unknown> {
  http: HttpClient<SecurityDataType>;

  constructor(http: HttpClient<SecurityDataType>) {
    this.http = http;
  }

  /**
   * No description
   *
   * @tags AIChatSession
   * @name AiChatSessionControllerCreate
   * @request POST:/ai-chat-session/session
   * @secure
   */
  aiChatSessionControllerCreate = (data: CreateSessionDto, params: RequestParams = {}) =>
    this.http.request<CreateSessionVo, any>({
      path: `/api/ai-chat-session/session`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags AIChatSession
   * @name AiChatSessionControllerGetSessions
   * @request GET:/ai-chat-session/sessions
   * @secure
   */
  aiChatSessionControllerGetSessions = (params: RequestParams = {}) =>
    this.http.request<GetSessionsVo, any>({
      path: `/api/ai-chat-session/sessions`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags AIChatSession
   * @name AiChatSessionControllerRemoveSession
   * @request DELETE:/ai-chat-session/session/{id}
   * @secure
   */
  aiChatSessionControllerRemoveSession = (id: number, params: RequestParams = {}) =>
    this.http.request<void, any>({
      path: `/api/ai-chat-session/session/${id}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
}
