import { Controller } from '@nestjs/common';
import { RewardService } from '../../application/reward-management/reward.service';
import { EVENT_SERVER_COMMAND } from '@app/common/variable/event-server-command';
import { CreateRewardDto } from '@app/common/dto/create-reward.dto';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class RewardController {
  constructor(private readonly rewardService: RewardService) {}

  @MessagePattern({ cmd: EVENT_SERVER_COMMAND.CREATE_REWARD })
  async createReward(dto: CreateRewardDto): Promise<string> {
    return await this.rewardService.createReward(dto);
  }
}
