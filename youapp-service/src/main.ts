import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { buildSwagger } from './swagger';
import { ValidationPipe } from '@nestjs/common';

// boostrap
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
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
