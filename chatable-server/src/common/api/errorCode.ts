export enum ErrorCode {
  USER_NOT_FOUND = 10001,
  REGISTER_EMAIL_ALREADY_EXISTS = 10002,
  REGISTER_PHONE_ALREADY_EXISTS = 10003,
  LOGIN_USER_INVALID_ACCOUNT_TYPE = 10004,
  LOGIN_PHONE_VERIFY_FAILED = 10005,
  LOGIN_EMAIL_VERIFY_FAILED = 10006,
  LOGIN_GITHUB_NOT_BOUND = 10007,

  SESSION_NOT_FOUND = 10100,
  SESSION_ID_ILLEGAL = 10101,
}

export const ErrorCodeMsg: Record<ErrorCode, string> = {
  [ErrorCode.USER_NOT_FOUND]: 'user not found',
  [ErrorCode.REGISTER_EMAIL_ALREADY_EXISTS]: 'email has been registered',
  [ErrorCode.REGISTER_PHONE_ALREADY_EXISTS]: 'phone has benn registered',
  [ErrorCode.LOGIN_USER_INVALID_ACCOUNT_TYPE]: 'user account is invalid type',
  [ErrorCode.LOGIN_PHONE_VERIFY_FAILED]: "phone hasn't been registered or password incorrect",
  [ErrorCode.LOGIN_EMAIL_VERIFY_FAILED]: "email hasn't been registered or password incorrect",
  [ErrorCode.LOGIN_GITHUB_NOT_BOUND]: "github account hasn't been bound to any account",

  [ErrorCode.SESSION_NOT_FOUND]: 'session not found',
  [ErrorCode.SESSION_ID_ILLEGAL]: 'session id is not belong to user',
};
