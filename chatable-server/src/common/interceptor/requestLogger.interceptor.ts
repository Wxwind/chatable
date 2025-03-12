import { CallHandler, ExecutionContext, Inject, Injectable, LoggerService, NestInterceptor } from '@nestjs/common';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { getReqMainInfo } from './requestLogger.util';
import { Request } from 'express';

const CONTEXT_NAME = 'RequestLoggerInterceptor';

@Injectable()
export class RequestLoggerInterceptor implements NestInterceptor {
  constructor(@Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly loggerService: LoggerService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp();
    const req = ctx.getRequest<Request>();
    const reqInfo = getReqMainInfo(req);
    this.loggerService.log(`request=[${JSON.stringify(reqInfo)}]`, CONTEXT_NAME);
    const start = Date.now();

    return next.handle().pipe(
      tap((data) => {
        const end = Date.now();
        const duration = end - start;
        this.loggerService.log(`response=[${JSON.stringify(data)}] duration=[${duration}ms]`, CONTEXT_NAME);
      }),
      catchError((error) => {
        const end = Date.now();
        const duration = end - start;
        this.loggerService.error(`duration=[${duration}ms]`);
        return throwError(() => error);
      })
    );
  }
}
