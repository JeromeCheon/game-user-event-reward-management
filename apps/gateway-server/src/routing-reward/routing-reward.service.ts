import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { EVENT_SERVER } from '@app/common/variable/symbols';
import { CreateRewardDto } from '@app/common/dto/create-reward.dto';
import { EVENT_SERVER_COMMAND } from '@app/common/variable/event-server-command';
import { firstValueFrom } from 'rxjs';
import { CreateRewardItemDto } from '@app/common/dto/create-reward-item.dto';
import { RewardItemViewModel } from '@app/common/view-model/reward-item.viewmodel';
import { AuthUserInfo } from '@app/common/dto/auth-user-info';
import { RewardItemInfo } from 'apps/event-server/src/domain/reward/reward-item-info';
import { RewardClaimHistoryViewModel } from '@app/common/view-model/reward-claim-history.viewmodel';

@Injectable()
export class RoutingRewardService {
  constructor(
    @Inject(EVENT_SERVER) private readonly eventClient: ClientProxy,
  ) {}

  async createReward(createRewardDto: CreateRewardDto): Promise<string> {
    return await firstValueFrom(
      this.eventClient.send(
        { cmd: EVENT_SERVER_COMMAND.CREATE_REWARD },
        createRewardDto,
      ),
    );
  }

  async createRewardItem(dto: CreateRewardItemDto): Promise<string> {
    return await firstValueFrom(
      this.eventClient.send(
        { cmd: EVENT_SERVER_COMMAND.CREATE_REWARD_ITEM },
        dto,
      ),
    );
  }

  async claimReward(
    eventId: string,
    user: AuthUserInfo,
  ): Promise<RewardItemInfo[]> {
    return await firstValueFrom(
      this.eventClient.send(
        { cmd: EVENT_SERVER_COMMAND.CLAIM_EVENT_REWARD },
        { eventId, user },
      ),
    );
  }

  async getRewardItems(user: AuthUserInfo): Promise<RewardItemViewModel[]> {
    return await firstValueFrom(
      this.eventClient.send(
        { cmd: EVENT_SERVER_COMMAND.GET_REWARD_ITEMS },
        user,
      ),
    );
  }

  async getAllRewardClaimHistories(): Promise<RewardClaimHistoryViewModel[]> {
    return await firstValueFrom(
      this.eventClient.send(
        { cmd: EVENT_SERVER_COMMAND.GET_ALL_REWARD_CLAIM_HISTORIES },
        {},
      ),
    );
  }

  async getUserRewardClaimHistories(
    userId: string,
  ): Promise<RewardClaimHistoryViewModel[]> {
    return await firstValueFrom(
      this.eventClient.send(
        { cmd: EVENT_SERVER_COMMAND.GET_USER_REWARD_CLAIM_HISTORIES },
        { userId },
      ),
    );
  }
}
