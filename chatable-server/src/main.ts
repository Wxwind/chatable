import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import { ConfigService } from '@nestjs/config';
import { EnvironmentVariables } from './config/type';
import { ValidationPipe } from '@nestjs/common';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Chatable')
    .setDescription('The chatable API description')
    .setVersion('1.0')
    .addTag('chatable')
    .addBearerAuth()
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory, {
    jsonDocumentUrl: 'api/json',
  });

  app.use(
    helmet({
      crossOriginEmbedderPolicy: false,
      contentSecurityPolicy: {
        directives: {
          imgSrc: [`'self'`, 'data:', 'apollo-server-landing-page.cdn.apollographql.com'],
          scriptSrc: [`'self'`, `https: 'unsafe-inline'`],
          manifestSrc: [`'self'`, 'apollo-server-landing-page.cdn.apollographql.com'],
          frameSrc: [`'self'`, 'sandbox.embed.apollographql.com'],
        },
      },
    })
  );
  app.useGlobalPipes(new ValidationPipe());
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));

  const configService: ConfigService<EnvironmentVariables, true> = app.get(ConfigService);
  const port = configService.get<string>('PORT');
  const allowed_origins = configService.get<string>('ALLOWED_ORIGINS');

  if (allowed_origins) {
    app.enableCors({
      origin: allowed_origins.split(','),
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
      credentials: true,
    });
  }

  await app.listen(port ?? 3000);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
