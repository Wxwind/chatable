import axios, { type AxiosResponse, type AxiosRequestConfig } from 'axios';
import { ResponseInfo } from './types';

const service = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
  timeout: 5000,
  withCredentials: false, // 跨域请求是否需要携带 cookie
});

/**
 * @type Q post请求的数据类型
 * @type D 回应的消息中data的类型
 */
export const request = async <Q = unknown, D = unknown>(config: AxiosRequestConfig<Q>): Promise<D> => {
  const a = await service.request<ResponseInfo<D>, AxiosResponse<ResponseInfo<D>>, Q>(config);
  return a.data.data;
};

//请求拦截器
service.interceptors.request.use(
  (config) => {
    console.log(`发送消息`);
    console.log(config);
    return config;
  },
  (error: any) => {
    return Promise.reject(new Error(error));
  }
);

//返回拦截器
service.interceptors.response.use(
  // 2xx 范围内的状态码都会触发该函数。
  (response: AxiosResponse<ResponseInfo<any>>) => {
    const { code, msg } = response.data;

    console.log(`收到消息`);
    console.log(response);
    if (code === 0) {
      return response;
    } else {
      //服务器内部逻辑输出了非0的错误码
      return Promise.reject(new Error(`${code}: ${msg}`));
    }
  },
  //超出 2xx 范围的状态码都会触发该函数
  (error: any) => {
    let message = '';
    if (error && error.response) {
      switch (error.response.status) {
        case 400:
          message = '参数有误';
          break;
        case 401:
          message = '未登录';
          break;
        case 403:
          message = '没有权限操作';
          break;
        case 404:
          message = `请求地址出错`;
          break;
        case 408:
          message = '请求超时';
          break;
        case 500:
          message = '服务器内部错误';
          break;
        case 501:
          message = '服务未实现';
          break;
        case 502:
          message = '网关错误';
          break;
        case 503:
          message = '服务器目前不可用';
          break;
        case 504:
          message = '网关超时';
          break;
        default:
          message = '未知错误';
          break;
      }
    }

    return Promise.reject(new Error(error.message));
  }
);
