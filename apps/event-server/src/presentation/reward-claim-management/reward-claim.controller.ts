import { Controller } from '@nestjs/common';
import { EVENT_SERVER_COMMAND } from '@app/common/variable/event-server-command';
import { MessagePattern } from '@nestjs/microservices';
import { AuthUserInfo } from '@app/common/dto/auth-user-info';
import { RewardClaimService } from '../../application/reward-claim-management/reward-claim.service';

@Controller()
export class RewardClaimController {
  constructor(private readonly rewardClaimService: RewardClaimService) {}

  @MessagePattern({ cmd: EVENT_SERVER_COMMAND.CLAIM_EVENT_REWARD })
  async claimEventReward({
    eventId,
    user,
  }: {
    eventId: string;
    user: AuthUserInfo;
  }) {
    return await this.rewardClaimService.claimEventReward({ eventId, user });
  }
}
