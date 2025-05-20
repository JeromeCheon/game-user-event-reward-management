import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';
import config from '@app/common';

async function bootstrap() {
  const logger = new Logger('EventServer');
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
      options: {
        host: config.get('event.host'),
        port: config.get('event.port'),
      },
    },
  );
  await app.listen();
  logger.log(`Event server is running on port ${config.get('event.port')}`);
}
bootstrap();
