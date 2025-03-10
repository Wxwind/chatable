import { Inject, Injectable, NestMiddleware } from '@nestjs/common';
import * as dayjs from 'dayjs';
import { NextFunction, Request, Response } from 'express';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(@Inject(WINSTON_MODULE_PROVIDER) private logger: Logger) {}

  use(req: Request, res: Response, next: NextFunction) {
    // 记录开始时间
    const start = Date.now();
    // 获取请求信息
    const { method, originalUrl, ip, httpVersion, headers } = req;

    // 获取响应信息
    const { statusCode } = res;

    res.on('finish', () => {
      // 记录结束时间
      const end = Date.now();
      // 计算时间差
      const duration = end - start;
      console.log('headers', headers);
      const logFormat = `${dayjs().format('YYYY-MM-DD HH:mm:ss')} ${method} ${originalUrl} HTTP/${httpVersion} ${ip} ${statusCode} ${headers['X-Request-Id']} ${duration}ms`;

      // 根据状态码，进行日志类型区分
      if (statusCode >= 500) {
        this.logger.error(logFormat, originalUrl);
      } else if (statusCode >= 400) {
        console.log('这是中间件1');
        this.logger.warn(logFormat, originalUrl);
      } else {
        this.logger.info(logFormat, originalUrl);
      }
    });

    next();
  }
}
