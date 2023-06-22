import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { connectDataSource } from 'core/config/datasource.config';
import { PORT } from 'core/environments';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  await Promise.all([app.listen(PORT || 4000), connectDataSource()]);
}
bootstrap();
