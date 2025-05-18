import { Module } from '@nestjs/common';
import { RoutingRewardService } from './routing-reward.service';
import { RoutingRewardController } from './routing-reward.controller';
import { EVENT_SERVER } from '@app/common/variable/symbols';
import { ClientsModule, Transport } from '@nestjs/microservices';

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
  controllers: [RoutingRewardController],
  providers: [RoutingRewardService],
})
export class RoutingRewardModule {}
