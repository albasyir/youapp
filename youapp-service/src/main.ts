import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { buildSwagger } from './swagger';
import { Logger, RequestMethod, ValidationPipe } from '@nestjs/common';
import { InstanceLoader } from '@nestjs/core/injector/instance-loader';

// boostrap
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger(InstanceLoader.name);

  app.enableCors();
  logger.log("allowed full CORS")

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  await buildSwagger(app);
  logger.log("swagger included")

  app.listen(3000).then(async () => {
    logger.log(`serve on ${await app.getUrl() }`)
  })
}

// boostrap caller
bootstrap();
