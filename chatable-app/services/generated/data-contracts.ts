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

export interface LoginVo {
  access_token: string;
}

export interface LoginDto {
  account: string;
  password: string;
}

export interface CreateUserDto {
  type: "phone" | "email";
  account: string;
  password: string;
  username: string;
}

export interface CreateSessionDto {
  modelName: string;
  initialMessage: string;
}

export interface CreateSessionVo {
  sessionId: number;
}

export interface GetSessionsVo {
  sessions: string[];
}

export interface PostMessageDto {
  message: string;
}

export interface GetMessagesDto {
  sessionId: number;
  page: number;
  limit: number;
}
