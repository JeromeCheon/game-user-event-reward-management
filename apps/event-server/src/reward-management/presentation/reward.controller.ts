import { Controller } from '@nestjs/common';
import { EVENT_SERVER_COMMAND } from '@app/common/variable/event-server-command';
import { CreateRewardDto } from '@app/common/dto/create-reward.dto';
import { MessagePattern } from '@nestjs/microservices';
import { CreateRewardService } from '../application/create-reward.service';
import { GetRewardsService } from '../application/get-rewards.service';
import { GetRewardByIdService } from '../application/get-reward-detail.service';

@Controller()
export class RewardController {
  constructor(
    private readonly createRewardService: CreateRewardService,
    private readonly getAllRewardsService: GetRewardsService,
    private readonly getRewardByIdService: GetRewardByIdService,
  ) {}

  @MessagePattern({ cmd: EVENT_SERVER_COMMAND.CREATE_REWARD })
  async createReward(dto: CreateRewardDto): Promise<string> {
    return await this.createRewardService.execute(dto);
  }

  @MessagePattern({ cmd: EVENT_SERVER_COMMAND.GET_ALL_REWARDS })
  async getAllRewards() {
    return await this.getAllRewardsService.execute();
  }

  @MessagePattern({ cmd: EVENT_SERVER_COMMAND.GET_REWARD_BY_ID })
  async getRewardById(id: string) {
    return await this.getRewardByIdService.execute(id);
  }
}
