import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import helmet from 'helmet';
import { ConfigService } from '@nestjs/config';
import { EnvironmentVariables } from './config/type';
import { ValidationPipe } from '@nestjs/common';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

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

  const configService: ConfigService<EnvironmentVariables, true> = app.get(ConfigService);
  const port = configService.get('PORT');
  await app.listen(port);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
