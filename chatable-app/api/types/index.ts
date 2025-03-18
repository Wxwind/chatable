export type ResponseInfo<T> = {
  code: number;
  msg: string;
  data: T;
};
