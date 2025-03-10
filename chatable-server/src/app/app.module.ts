import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AIModule } from '../ai/ai.module';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../user/user.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from '@/auth/jwt-auth.guard';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnvironmentVariables } from '@/config/type';
import { User } from '@/user/user.entity';
import { ClsModule } from 'nestjs-cls';
import { v4 as uuid } from 'uuid';
import { Request } from 'express';
import { WinstonModule } from 'nest-winston';
import { format, transports } from 'winston';
import 'winston-daily-rotate-file';
import { LoggerMiddleware } from '@/middleware/logger.middleware';

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
      useFactory() {
        const myFormat = format.printf(({ level, message, context, timestamp }) => {
          return `[${timestamp}] ${level} [${context}]: ${message}`;
        });

        return {
          format: format.combine(
            format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
            myFormat,
            format.colorize({ all: true })
          ),
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
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
