import { NestFactory } from '@nestjs/core';
import { EventServerModule } from './event-server.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('EventServer');
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    EventServerModule,
    {
      transport: Transport.TCP,
      options: {
        host: 'localhost',
        port: 3002,
      },
    },
  );
  await app.listen();
  logger.log('Event server is running on port 3002');
}
bootstrap();
