import { Module } from '@nestjs/common';
import { EventServerController } from './presentation/event-server.controller';
import { EventServerService } from './application/event-server.service';
import { EVENT_REPOSITORY } from './domain/event.repository';
import { MongooseEventRepository } from './infra/mongoose.event.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { ConnectionUrl } from '@app/common/variable/db-connection';
import { EventDocument } from '@app/schema/schemas/event.schema';
import { EventSchema } from '@app/schema/schemas/event.schema';
import { MongooseRewardItemRepository } from './infra/mongoose.reward-item.repository';
import { REWARD_ITEM_REPOSITORY } from './domain/reward-item/reward-item.repository';
import { RewardItemDocument } from '@app/schema/schemas/reward-item.schema';
import { RewardItemSchema } from '@app/schema/schemas/reward-item.schema';
import { RewardItemController } from './presentation/reward-item-management/reward-item.controller';
import { RewardItemService } from './application/reward-item-management/reward-item.service';

@Module({
  imports: [
    MongooseModule.forRoot(ConnectionUrl, {
      authSource: 'admin',
      tls: false,
    }),
    MongooseModule.forFeature([
      { name: EventDocument.name, schema: EventSchema },
      { name: RewardItemDocument.name, schema: RewardItemSchema },
    ]),
  ],
  controllers: [EventServerController, RewardItemController],
  providers: [
    EventServerService,
    RewardItemService,
    {
      provide: EVENT_REPOSITORY,
      useClass: MongooseEventRepository,
    },
    {
      provide: REWARD_ITEM_REPOSITORY,
      useClass: MongooseRewardItemRepository,
    },
  ],
})
export class EventServerModule {}
