import { NestFactory } from '@nestjs/core';
import { AuthServerModule } from './auth-server.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('AuthServer');
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AuthServerModule,
    {
      transport: Transport.TCP,
      options: {
        host: 'localhost',
        port: 3001,
      },
    },
  );
  await app.listen();
  logger.log('Auth server is listening on port 3001');
}
bootstrap();
