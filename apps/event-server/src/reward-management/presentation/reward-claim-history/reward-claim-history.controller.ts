import { Controller } from '@nestjs/common';
import { EVENT_SERVER_COMMAND } from '@app/common/variable/event-server-command';
import { MessagePattern } from '@nestjs/microservices';
import { GetRewardClaimHistoriesService } from '../../application/get-reward-claim-histories.service';
import { GetRewardClaimHistoryDetailService } from '../../application/get-reward-claim-history-detail.service';

@Controller()
export class RewardClaimHistoryController {
  constructor(
    private readonly getRewardClaimHistoriesService: GetRewardClaimHistoriesService,
    private readonly getRewardClaimHistoryDetailService: GetRewardClaimHistoryDetailService,
  ) {}

  @MessagePattern({ cmd: EVENT_SERVER_COMMAND.GET_ALL_REWARD_CLAIM_HISTORIES })
  async getAllRewardClaimHistories() {
    return await this.getRewardClaimHistoriesService.execute();
  }

  @MessagePattern({ cmd: EVENT_SERVER_COMMAND.GET_USER_REWARD_CLAIM_HISTORIES })
  async getUserRewardClaimHistories({ userId }: { userId: string }) {
    return await this.getRewardClaimHistoryDetailService.execute(userId);
  }
}
