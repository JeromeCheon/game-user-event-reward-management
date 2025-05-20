import { Inject, Injectable } from '@nestjs/common';
import {
  EVENT_REWARD_CLAIM_HISTORY_REPOSITORY,
  EventRewardClaimHistoryRepository,
} from '../../event-management/domain/event-reward-claim-history.repository';
import { RewardClaimHistoryViewModel } from '@app/common/view-model/reward-claim-history.viewmodel';

@Injectable()
export class GetRewardClaimHistoryDetailService {
  constructor(
    @Inject(EVENT_REWARD_CLAIM_HISTORY_REPOSITORY)
    private readonly eventRewardClaimHistoryRepository: EventRewardClaimHistoryRepository,
  ) {}

  async execute(userId: string): Promise<RewardClaimHistoryViewModel[]> {
    const histories =
      await this.eventRewardClaimHistoryRepository.findByUserId(userId);
    return histories.map((history) =>
      RewardClaimHistoryViewModel.fromDomain(history),
    );
  }
}
