import { Module } from '@nestjs/common';
import { IdentityAccessModule } from './identity-access/identity-access.module';
import { RoutingEventModule } from './routing-event/routing-event.module';
import { RoutingRewardModule } from './routing-reward/routing-reward.module';

@Module({
  imports: [IdentityAccessModule, RoutingEventModule, RoutingRewardModule],
  controllers: [],
})
export class AppModule {}
