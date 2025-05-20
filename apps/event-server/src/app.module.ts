import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConnectionUrl } from '@app/common/variable/db-connection';
import { EventDocument } from '@app/schema/schemas/event.schema';

import { EventSchema } from '@app/schema/schemas/event.schema';
import {
  EventRewardClaimHistoryDocument,
  EventRewardClaimHistorySchema,
} from '@app/schema/schemas/event-reward-claim-history.schema';
import {
  RewardItemDocument,
  RewardItemSchema,
} from '@app/schema/schemas/reward-item.schema';
import {
  RewardDocument,
  RewardSchema,
} from '@app/schema/schemas/reward.schema';
import {
  UserEventProgressDocument,
  UserEventProgressSchema,
} from '@app/schema/schemas/user-event-progress.schema';
import { UserDocument, UserSchema } from '@app/schema/schemas/user.schema';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { EVENT_REWARD_CLAIM_HISTORY_REPOSITORY } from './event-management/domain/event-reward-claim-history.repository';
import { EVENT_REPOSITORY } from './event-management/domain/event.repository';
import { LOOKUP_USER_REPOSITORY } from './event-management/domain/user-event-progress/lookup-user-repository';
import { USER_EVENT_PROGRESS_REPOSITORY } from './event-management/domain/user-event-progress/user-event-progress.repository';
import { MongooseEventRewardClaimHistoryRepository } from './event-management/infra/mongoose.event-reward-claim-history.repository';
import { MongooseEventRepository } from './event-management/infra/mongoose.event.repository';
import { MongooseLookupUserRepository } from './event-management/infra/mongoose.lookup-user-repository';
import { MongooseUserEventProgressRepository } from './event-management/infra/mongoose.user-event-progress.repository';
import { EventController } from './event-management/presentation/event.controller';
import { OnEventActivatedSubscriber } from './event-management/subscription/on-event-activated.subscriber';
import { GetRewardClaimHistoriesService } from './reward-management/application/get-reward-claim-histories.service';
import { ClaimEventRewardService } from './reward-management/application/claim-event-reward.service';
import { CreateRewardItemService } from './reward-management/application/create-reward-item.service';
import { REWARD_ITEM_REPOSITORY } from './reward-management/domain/reward-item.repository';
import { REWARD_REPOSITORY } from './reward-management/domain/reward.repository';
import { MongooseRewardItemRepository } from './reward-management/infra/mongoose.reward-item.repository';
import { MongooseRewardRepository } from './reward-management/infra/mongoose.reward.repository';
import { RewardClaimHistoryController } from './reward-management/presentation/reward-claim-history/reward-claim-history.controller';
import { RewardClaimController } from './reward-management/presentation/reward-claim/reward-claim.controller';
import { RewardItemController } from './reward-management/presentation/reward-item/reward-item.controller';
import { RewardController } from './reward-management/presentation/reward.controller';
import { GetEventsService } from './event-management/application/get-events.service';
import { CreateEventService } from './event-management/application/create-event.service';
import { GetEventDetailService } from './event-management/application/get-event-detail.service';
import { UpdateEventActiveService } from './event-management/application/update-event-active.service';
import { GetRewardByIdService } from './reward-management/application/get-reward-detail.service';
import { CreateRewardService } from './reward-management/application/create-reward.service';
import { GetRewardsService } from './reward-management/application/get-rewards.service';
import { GetRewardItemsService } from './reward-management/application/get-reward-items.service';
import { GetRewardClaimHistoryDetailService } from './reward-management/application/get-reward-claim-history-detail.service';
import { OnUserCreatedSubscriber } from './event-management/subscription/on-user-created.subscriber';

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
      { name: UserDocument.name, schema: UserSchema },
      {
        name: EventRewardClaimHistoryDocument.name,
        schema: EventRewardClaimHistorySchema,
      },
    ]),
    EventEmitterModule.forRoot(),
  ],
  controllers: [
    EventController,
    RewardItemController,
    RewardController,
    RewardClaimController,
    RewardClaimHistoryController,
    OnUserCreatedSubscriber,
  ],
  providers: [
    GetEventsService,
    GetEventDetailService,
    UpdateEventActiveService,
    CreateEventService,
    GetRewardByIdService,
    GetRewardsService,
    CreateRewardService,
    CreateRewardItemService,
    ClaimEventRewardService,
    GetRewardClaimHistoriesService,
    OnEventActivatedSubscriber,
    GetRewardItemsService,
    GetRewardClaimHistoryDetailService,
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
    {
      provide: EVENT_REWARD_CLAIM_HISTORY_REPOSITORY,
      useClass: MongooseEventRewardClaimHistoryRepository,
    },
  ],
})
export class AppModule {}
