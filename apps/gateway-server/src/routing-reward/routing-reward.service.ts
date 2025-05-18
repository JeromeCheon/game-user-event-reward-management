import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { EVENT_SERVER } from '@app/common/variable/symbols';
import { CreateRewardDto } from '@app/common/dto/create-reward.dto';
import { EVENT_SERVER_COMMAND } from '@app/common/variable/event-server-command';
import { firstValueFrom } from 'rxjs';
import { CreateRewardItemDto } from '@app/common/dto/create-reward-item.dto';
import { RewardItemViewModel } from '@app/common/view-model/reward-item.viewmodel';
import { AuthUserInfo } from '@app/common/dto/auth-user-info';

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

  async getRewardItems(user: AuthUserInfo): Promise<RewardItemViewModel[]> {
    return await firstValueFrom(
      this.eventClient.send(
        { cmd: EVENT_SERVER_COMMAND.GET_REWARD_ITEMS },
        user,
      ),
    );
  }
}
