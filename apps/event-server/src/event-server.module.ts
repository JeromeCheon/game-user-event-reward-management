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
import { RewardDocument } from '@app/schema/schemas/reward.schema';
import { RewardSchema } from '@app/schema/schemas/reward.schema';
import { RewardController } from './presentation/reward-management/reward.controller';
import { RewardService } from './application/reward-management/reward.service';
import { REWARD_REPOSITORY } from './domain/reward/reward.repository';
import { MongooseRewardRepository } from './infra/mongoose.reward.repository';

@Module({
  imports: [
    MongooseModule.forRoot(ConnectionUrl, {
      authSource: 'admin',
      tls: false,
    }),
    MongooseModule.forFeature([
      { name: EventDocument.name, schema: EventSchema },
      { name: RewardItemDocument.name, schema: RewardItemSchema },
      { name: RewardDocument.name, schema: RewardSchema },
    ]),
  ],
  controllers: [EventServerController, RewardItemController, RewardController],
  providers: [
    EventServerService,
    RewardItemService,
    RewardService,
    {
      provide: EVENT_REPOSITORY,
      useClass: MongooseEventRepository,
    },
    {
      provide: REWARD_ITEM_REPOSITORY,
      useClass: MongooseRewardItemRepository,
    },
    {
      provide: REWARD_REPOSITORY,
      useClass: MongooseRewardRepository,
    },
  ],
})
export class EventServerModule {}
