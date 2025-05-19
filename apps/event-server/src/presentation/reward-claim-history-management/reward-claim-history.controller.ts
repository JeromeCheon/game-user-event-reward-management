import { Controller } from '@nestjs/common';
import { EVENT_SERVER_COMMAND } from '@app/common/variable/event-server-command';
import { MessagePattern } from '@nestjs/microservices';
import { RewardClaimHistoryService } from '../../application/reward-claim-history-management/reward-claim-history.service';

@Controller()
export class RewardClaimHistoryController {
  constructor(
    private readonly rewardClaimHistoryService: RewardClaimHistoryService,
  ) {}

  @MessagePattern({ cmd: EVENT_SERVER_COMMAND.GET_ALL_REWARD_CLAIM_HISTORIES })
  async getAllRewardClaimHistories() {
    return await this.rewardClaimHistoryService.getAllHistories();
  }

  @MessagePattern({ cmd: EVENT_SERVER_COMMAND.GET_USER_REWARD_CLAIM_HISTORIES })
  async getUserRewardClaimHistories({ userId }: { userId: string }) {
    return await this.rewardClaimHistoryService.getUserHistories(userId);
  }
}
