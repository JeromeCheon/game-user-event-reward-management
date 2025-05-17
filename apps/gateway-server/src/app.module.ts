import { Module } from '@nestjs/common';
import { IdentityAccessModule } from './identity-access/identity-access.module';
import { RoutingEventModule } from './routing-event/routing-event.module';

@Module({
  imports: [IdentityAccessModule, RoutingEventModule],
  controllers: [],
})
export class AppModule {}
