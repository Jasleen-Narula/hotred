import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

var allowlist = ['https://hot-red-web-service.onrender.com'];

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
