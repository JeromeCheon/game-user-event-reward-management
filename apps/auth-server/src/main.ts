import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';
import config from '@app/common';

async function bootstrap() {
  const logger = new Logger('AuthServer');
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
      options: {
        host: config.get('auth.host'),
        port: config.get('auth.port'),
      },
    },
  );
  await app.listen();
  logger.log(`Auth server is listening on port ${config.get('auth.port')}`);
}
bootstrap();
