import { Inject, Injectable, LoggerService, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { getReqMainInfo } from './logger.uitl';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(@Inject(WINSTON_MODULE_NEST_PROVIDER) private logger: LoggerService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const start = Date.now();

    const reqInfo = getReqMainInfo(req);

    this.logger.log('start request: ' + JSON.stringify(reqInfo));

    res.on('finish', () => {
      // 获取响应信息
      const { statusCode } = res;
      const end = Date.now();
      const duration = end - start;
      const message = `end request: status: ${statusCode} cost: ${duration}ms`;

      this.logger.log(message);
    });

    next();
  }
}
