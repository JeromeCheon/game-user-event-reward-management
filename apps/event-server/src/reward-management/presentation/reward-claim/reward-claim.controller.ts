import { Controller } from '@nestjs/common';
import { EVENT_SERVER_COMMAND } from '@app/common/variable/event-server-command';
import { MessagePattern } from '@nestjs/microservices';
import { AuthUserInfo } from '@app/common/dto/auth-user-info';
import { ClaimEventRewardService } from '../../application/claim-event-reward.service';
@Controller()
export class RewardClaimController {
  constructor(private readonly rewardClaimService: ClaimEventRewardService) {}

  @MessagePattern({ cmd: EVENT_SERVER_COMMAND.CLAIM_EVENT_REWARD })
  async claimEventReward({
    eventId,
    user,
  }: {
    eventId: string;
    user: AuthUserInfo;
  }) {
    return await this.rewardClaimService.execute({ eventId, user });
  }
}
