import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { buildSwagger } from './swagger';
import { RequestMethod, ValidationPipe } from '@nestjs/common';

// boostrap
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix("/api", {
    exclude: [
      {
        path: '/docs',
        method: RequestMethod.GET
      },
      {
        path: '/docs-json',
        method: RequestMethod.GET
      }
    ]
  })
  app.enableCors();

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  await buildSwagger(app);
  app.listen(3000);
}

// boostrap caller
bootstrap();
