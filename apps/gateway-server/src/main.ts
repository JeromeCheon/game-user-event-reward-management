import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('GatewayServer');
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
  logger.log('Gateway server is listening on port 3000');
}
bootstrap();
