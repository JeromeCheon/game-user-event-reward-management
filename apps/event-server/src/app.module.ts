import { Module } from '@nestjs/common';
import { EventController } from './presentation/event-management/event.controller';
import { EventService } from './application/event-management/event.service';
import { EVENT_REPOSITORY } from './domain/event/event.repository';
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
import { MongooseUserEventProgressRepository } from './infra/mongoose.user-event-progress.repository';
import { USER_EVENT_PROGRESS_REPOSITORY } from './domain/user-event-progress/user-event-progress.repository';
import { MongooseLookupUserRepository } from './infra/mongoose.lookup-user-repository';
import { LOOKUP_USER_REPOSITORY } from './domain/user-event-progress/lookup-user-repository';
import { UserEventProgressDocument } from '@app/schema/schemas/user-event-progress.schema';
import { UserEventProgressSchema } from '@app/schema/schemas/user-event-progress.schema';
import { GameUserDocument } from '@app/schema/schemas/user.schema';
import { GameUserSchema } from '@app/schema/schemas/user.schema';
import { OnEventActivatedSubscriber } from './subscription/on-event-activated.subscriber';
import { EventEmitterModule } from '@nestjs/event-emitter';

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
      { name: UserEventProgressDocument.name, schema: UserEventProgressSchema },
      { name: GameUserDocument.name, schema: GameUserSchema },
    ]),
    EventEmitterModule.forRoot(),
  ],
  controllers: [EventController, RewardItemController, RewardController],
  providers: [
    EventService,
    RewardItemService,
    RewardService,
    OnEventActivatedSubscriber,
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
    {
      provide: USER_EVENT_PROGRESS_REPOSITORY,
      useClass: MongooseUserEventProgressRepository,
    },
    {
      provide: LOOKUP_USER_REPOSITORY,
      useClass: MongooseLookupUserRepository,
    },
  ],
})
export class AppModule {}
