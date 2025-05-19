import { Inject, Injectable } from '@nestjs/common';
import {
  EVENT_REWARD_CLAIM_HISTORY_REPOSITORY,
  EventRewardClaimHistoryRepository,
} from '../../domain/event/event-reward-claim-history.repository';
import { RewardClaimHistoryViewModel } from '@app/common/view-model/reward-claim-history.viewmodel';

@Injectable()
export class RewardClaimHistoryService {
  constructor(
    @Inject(EVENT_REWARD_CLAIM_HISTORY_REPOSITORY)
    private readonly eventRewardClaimHistoryRepository: EventRewardClaimHistoryRepository,
  ) {}

  async getAllHistories(): Promise<RewardClaimHistoryViewModel[]> {
    const histories = await this.eventRewardClaimHistoryRepository.findAll();
    return histories.map((history) =>
      RewardClaimHistoryViewModel.fromDomain(history),
    );
  }

  async getUserHistories(
    userId: string,
  ): Promise<RewardClaimHistoryViewModel[]> {
    const histories =
      await this.eventRewardClaimHistoryRepository.findByUserId(userId);
    return histories.map((history) =>
      RewardClaimHistoryViewModel.fromDomain(history),
    );
  }
}
