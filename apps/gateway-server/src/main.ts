import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const logger = new Logger('GatewayServer');
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Game User Event Reward Management API')
    .setDescription(
      'Game User Event Reward Management API 문서입니다. \
      아래 API 명세를 보고 필요한 request body와 response를 확인할 수 있으며, 이를 통해 개발을 진행할 수 있으며, token을 통한 검증기능도 제공합니다.',
    )
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
      'Authorization',
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
  logger.log('Gateway server is listening on port 3000');
}
bootstrap();
