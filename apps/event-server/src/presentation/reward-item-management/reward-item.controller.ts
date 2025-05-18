import { Controller } from '@nestjs/common';
import { RewardItemService } from '../../application/reward-item-management/reward-item.service';
import { EVENT_SERVER_COMMAND } from '@app/common/variable/event-server-command';
import { CreateRewardItemDto } from '@app/common/dto/create-reward-item.dto';
import { MessagePattern } from '@nestjs/microservices';
import { RewardItemViewModel } from '@app/common/view-model/reward-item.viewmodel';

@Controller()
export class RewardItemController {
  constructor(private readonly rewardItemService: RewardItemService) {}

  @MessagePattern({ cmd: EVENT_SERVER_COMMAND.CREATE_REWARD_ITEM })
  async createRewardItem(dto: CreateRewardItemDto): Promise<string> {
    return await this.rewardItemService.createRewardItem(dto);
  }

  @MessagePattern({ cmd: EVENT_SERVER_COMMAND.GET_REWARD_ITEMS })
  async getRewardItems(): Promise<RewardItemViewModel[]> {
    return await this.rewardItemService.getRewardItems();
  }
}
