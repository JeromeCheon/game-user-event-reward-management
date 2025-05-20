import { Module } from '@nestjs/common';
import { RoutingEventService } from './routing-event.service';
import { RoutingEventController } from './routing-event.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { EVENT_SERVER } from '@app/common/variable/symbols';
import config from '@app/common';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: EVENT_SERVER,
        transport: Transport.TCP,
        options: {
          host: config.get('event.host'),
          port: config.get('event.port'),
        },
      },
    ]),
  ],
  controllers: [RoutingEventController],
  providers: [RoutingEventService],
})
export class RoutingEventModule {}
