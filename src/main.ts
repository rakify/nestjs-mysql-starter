import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { connectDataSource } from 'core/config/datasource.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await Promise.all([
    app.listen(process.env.PORT || 4000),
    connectDataSource(),
  ]);
}

bootstrap();
