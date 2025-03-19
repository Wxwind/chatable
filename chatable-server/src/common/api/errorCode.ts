export enum ErrorCode {
  USER_NOT_FOUND = 10001,
  USERNAME_ALREADY_EXISTS = 10002,

  SESSION_NOT_FOUND = 10100,
  SESSION_ID_ILLEGAL = 10101,
}

export const ErrorCodeMsg: Record<ErrorCode, string> = {
  [ErrorCode.USER_NOT_FOUND]: 'user not found',
  [ErrorCode.USERNAME_ALREADY_EXISTS]: 'user name has been registered',
  [ErrorCode.SESSION_NOT_FOUND]: 'session not found',
  [ErrorCode.SESSION_ID_ILLEGAL]: 'session id is not belong to user',
};
