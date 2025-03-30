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

import { CreateSessionDto, CreateSessionVo, GetMessagesDto, GetSessionsVo } from "./data-contracts";
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
   * @name AiChatSessionControllerCreateSession
   * @request POST:/ai-chat-session/session
   * @secure
   */
  aiChatSessionControllerCreateSession = (data: CreateSessionDto, params: RequestParams = {}) =>
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
  /**
   * No description
   *
   * @tags AIChatSession
   * @name AiChatSessionControllerGetHistoryMessage
   * @request GET:/ai-chat-session/session/{id}/chat
   * @secure
   */
  aiChatSessionControllerGetHistoryMessage = (id: number, data: GetMessagesDto, params: RequestParams = {}) =>
    this.http.request<void, any>({
      path: `/api/ai-chat-session/session/${id}/chat`,
      method: "GET",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
}
