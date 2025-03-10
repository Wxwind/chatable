import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus, Inject, LoggerService } from '@nestjs/common';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { Response } from 'express';
import { ResponseInfo } from '../api/responseInfo';
import { ApiException } from '../apiException';

@Catch(ApiException)
export class ApiExceptionFilter implements ExceptionFilter {
  constructor(@Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: LoggerService) {}

  catch(exception: ApiException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const resp = ctx.getResponse<Response>();

    const { code, message } = exception;

    const body: ResponseInfo = {
      code,
      msg: message,
    };

    this.logger.error(JSON.stringify(body));
    resp.status(HttpStatus.INTERNAL_SERVER_ERROR).json(body);
  }
}
