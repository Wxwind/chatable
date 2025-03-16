import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AIModule } from './ai/ai.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnvironmentVariables } from '@/config/type';
import { User } from '@/user/user.entity';
import { ClsModule, ClsService } from 'nestjs-cls';
import { v4 as uuid } from 'uuid';
import { Request } from 'express';
import { WinstonModule } from 'nest-winston';
import { format, transports } from 'winston';
import 'winston-daily-rotate-file';
import { HttpExceptionFilter } from '@/common/filter/httpException.filter';
import { ApiExceptionFilter } from '@/common/filter/apiException.filter';
import { GlobalExceptionsFilter } from '@/common/filter/globalException.filter';
import { GlobalResponseInterceptor } from '@/common/interceptor/globalResponse.interceptor';
import { RequestLoggerInterceptor } from '@/common/interceptor/requestLogger.interceptor';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', `.env.${process.env.NODE_ENV}.local`, `.env.${process.env.NODE_ENV}`],
    }),
    ClsModule.forRoot({
      middleware: {
        mount: true,
        generateId: true,
        idGenerator: (req: Request) => {
          return (req.headers['X-Request-Id'] as string) ?? uuid();
        },
      },
    }),
    WinstonModule.forRootAsync({
      imports: [ClsModule],
      inject: [ClsService],
      useFactory(clsService: ClsService) {
        const myFormat = format.printf((info) => {
          const { level, message, context, timestamp } = info;
          let msg = `[${timestamp}] ${level} [${context}] <${clsService.getId()}>: ${message}`;
          if (info.stack) {
            msg += `\n${info.stack as string}`;
          }
          return msg;
        });

        return {
          format: format.combine(format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), myFormat, format.colorize({ all: true })),
          transports: [
            new transports.Console(),
            new transports.DailyRotateFile({
              dirname: './logs/warns',
              filename: 'warn-%DATE%.log',
              datePattern: 'YYYY-MM-DD',
              zippedArchive: true,
              maxSize: '20m',
              maxFiles: '7d',
              level: 'warn',
            }),
            new transports.DailyRotateFile({
              dirname: './logs/infos',
              filename: 'info-%DATE%.log',
              datePattern: 'YYYY-MM-DD',
              zippedArchive: true,
              maxSize: '20m',
              maxFiles: '7d',
              level: 'info',
            }),
            new transports.DailyRotateFile({
              dirname: './logs/errors',
              filename: 'error-%DATE%.log',
              datePattern: 'YYYY-MM-DD',
              zippedArchive: true,
              maxSize: '20m',
              maxFiles: '30d',
              level: 'error',
            }),
          ],
        };
      },
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService<EnvironmentVariables>) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USER'),
        password: configService.get('DB_PASSWD'),
        database: configService.get('DB_DATABASE'),
        entities: [User],
        synchronize: configService.get('DB_SYNC'),
        logging: process.env.NODE_ENV === 'development',
      }),
    }),
    AIModule,
    AuthModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: GlobalResponseInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: RequestLoggerInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionsFilter,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_FILTER,
      useClass: ApiExceptionFilter,
    },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {}
}
