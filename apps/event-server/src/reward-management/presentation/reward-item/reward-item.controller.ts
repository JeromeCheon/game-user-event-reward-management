import { Controller } from '@nestjs/common';
import { EVENT_SERVER_COMMAND } from '@app/common/variable/event-server-command';
import { CreateRewardItemDto } from '@app/common/dto/create-reward-item.dto';
import { MessagePattern } from '@nestjs/microservices';
import { RewardItemViewModel } from '@app/common/view-model/reward-item.viewmodel';
import { CreateRewardItemService } from '../../application/create-reward-item.service';
import { GetRewardItemsService } from '../../application/get-reward-items.service';

@Controller()
export class RewardItemController {
  constructor(
    private readonly createRewardItemService: CreateRewardItemService,
    private readonly getRewardItemsService: GetRewardItemsService,
  ) {}

  @MessagePattern({ cmd: EVENT_SERVER_COMMAND.CREATE_REWARD_ITEM })
  async createRewardItem(dto: CreateRewardItemDto): Promise<string> {
    return await this.createRewardItemService.execute(dto);
  }

  @MessagePattern({ cmd: EVENT_SERVER_COMMAND.GET_REWARD_ITEMS })
  async getRewardItems(): Promise<RewardItemViewModel[]> {
    return await this.getRewardItemsService.execute();
  }
}
