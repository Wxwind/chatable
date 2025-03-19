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

export interface LoginDto {
  username: string;
  password: string;
}

export interface LoginVo {
  access_token: string;
}

export interface CreateUserDto {
  username: string;
  password: string;
  nickname: string;
}

export interface CreateUserVo {
  id: number;
  username: string;
  nickname: string;
  /** @format date-time */
  createTime: string;
  /** @format date-time */
  updateTime: string;
}

export interface PostMessageDto {
  sessionId: string;
  message: string;
}

export interface CreateSessionDto {
  modelName: string;
}

export interface CreateSessionVo {
  sessionId: number;
}

export interface GetSessionsVo {
  sessions: string[];
}
