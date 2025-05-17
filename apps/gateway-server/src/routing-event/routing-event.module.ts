import { Module } from '@nestjs/common';
import { RoutingEventService } from './routing-event.service';
import { RoutingEventController } from './routing-event.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { EVENT_SERVER } from '@app/common/variable/symbols';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: EVENT_SERVER,
        transport: Transport.TCP,
        options: {
          host: 'localhost',
          port: 3002,
        },
      },
    ]),
  ],
  controllers: [RoutingEventController],
  providers: [RoutingEventService],
})
export class RoutingEventModule {}
