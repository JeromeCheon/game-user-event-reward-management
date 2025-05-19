import { Inject, Injectable } from '@nestjs/common';
import {
  EVENT_REPOSITORY,
  EventRepository,
} from '../../domain/event/event.repository';
import {
  EventComparisonOp,
  EventRewardClaimHistoryReason,
} from '@app/common/variable/event-type';
import { AuthUserInfo } from '@app/common/dto/auth-user-info';
import { RewardItemInfo } from '../../domain/reward/reward-item-info';
import { EventRewardClaimHistoryResult } from '@app/common/variable/event-type';
import { USER_EVENT_PROGRESS_REPOSITORY } from '../../domain/user-event-progress/user-event-progress.repository';
import {
  LOOKUP_USER_REPOSITORY,
  LookupUserRepository,
} from '../../domain/user-event-progress/lookup-user-repository';
import { UserEventProgressRepository } from '../../domain/user-event-progress/user-event-progress.repository';
import { NotFoundEventException } from '@app/common/exception/not-found-event.exception';
import {
  EVENT_REWARD_CLAIM_HISTORY_REPOSITORY,
  EventRewardClaimHistoryRepository,
} from '../../domain/event/event-reward-claim-history.repository';
import { DuplicateRewardClaimException } from '@app/common/exception/duplicate-reward-claim.exception';
import { InvalidMeetConditionException } from '@app/common/exception/invalid-meet-condition.exception';
import { InvalidUserEventProgressException } from '@app/common/exception/invalid-user-event-progress.exception';
import { UnauthorizedAccessEventException } from '@app/common/exception/unauthorized-access-event.exception';
import { EventRewardClaimHistory } from '../../domain/event/event-reward-claim-history';
import { EventCondition } from '../../domain/event/event-condition';
import { ProgressStatus } from '../../domain/user-event-progress/progress-status';
import { RewardRepository } from '../../domain/reward/reward.repository';
import { REWARD_REPOSITORY } from '../../domain/reward/reward.repository';

@Injectable()
export class RewardClaimService {
  constructor(
    @Inject(EVENT_REPOSITORY)
    private readonly eventRepository: EventRepository,
    @Inject(REWARD_REPOSITORY)
    private readonly rewardRepository: RewardRepository,
    @Inject(USER_EVENT_PROGRESS_REPOSITORY)
    private readonly userEventProgressRepository: UserEventProgressRepository,
    @Inject(LOOKUP_USER_REPOSITORY)
    private readonly lookupUserRepository: LookupUserRepository,
    @Inject(EVENT_REWARD_CLAIM_HISTORY_REPOSITORY)
    private readonly eventRewardClaimHistoryRepository: EventRewardClaimHistoryRepository,
  ) {}

  async claimEventReward({
    eventId,
    user,
  }: {
    eventId: string;
    user: AuthUserInfo;
  }): Promise<RewardItemInfo[]> {
    let resultCode: EventRewardClaimHistoryResult;
    let reason: EventRewardClaimHistoryReason;

    try {
      const event = await this.eventRepository.findById(eventId);
      if (!event) {
        resultCode = EventRewardClaimHistoryResult.REJECTED;
        reason = EventRewardClaimHistoryReason.NOT_FOUND_EVENT;
        throw new NotFoundEventException(eventId, reason);
      }

      const userLevel = await this.lookupUserRepository.getUserLevelById(
        user.id,
      );
      if (userLevel < event.minLevel) {
        resultCode = EventRewardClaimHistoryResult.REJECTED;
        reason = EventRewardClaimHistoryReason.NOT_ENOUGH_LEVEL;
        throw new UnauthorizedAccessEventException(eventId, user.id, reason);
      }

      const userEventProgress =
        await this.userEventProgressRepository.findOneByEventIdAndUserId(
          eventId,
          user.id,
        );

      if (!userEventProgress) {
        resultCode = EventRewardClaimHistoryResult.REJECTED;
        reason = EventRewardClaimHistoryReason.INVALID_USER_EVENT_PROGRESS;
        throw new InvalidUserEventProgressException(eventId, user.id, reason);
      }

      if (userEventProgress.isRewarded) {
        resultCode = EventRewardClaimHistoryResult.REJECTED;
        reason = EventRewardClaimHistoryReason.DUPLICATE_CLAIM;
        throw new DuplicateRewardClaimException(eventId, user.id, reason);
      }

      const isAllConditionsMet = event.conditions.every((condition) => {
        const singleStatus = userEventProgress.progressStatus.find(
          (progress) => progress.conditionType === condition.type,
        );
        return isEventConditionMet(condition, singleStatus);
      });

      if (!isAllConditionsMet) {
        resultCode = EventRewardClaimHistoryResult.REJECTED;
        reason = EventRewardClaimHistoryReason.NOT_MEET_CONDITION;
        throw new InvalidMeetConditionException(eventId, user.id, reason);
      }

      const prevUpdatedAt = userEventProgress.updatedAt;
      userEventProgress.approveReward();
      const isUpdated = await this.userEventProgressRepository.updateWithLock(
        userEventProgress,
        prevUpdatedAt,
      );
      if (!isUpdated) {
        resultCode = EventRewardClaimHistoryResult.REJECTED;
        reason = EventRewardClaimHistoryReason.DUPLICATE_CLAIM;
        throw new DuplicateRewardClaimException(eventId, user.id, reason);
      }
      resultCode = EventRewardClaimHistoryResult.APPROVED;
      reason = EventRewardClaimHistoryReason.QUALIFIED;
      const reward = await this.rewardRepository.findByEventId(event.id);
      return reward?.items || [];
    } finally {
      const eventRewardClaimHistory = new EventRewardClaimHistory({
        eventId: eventId,
        userId: user.id,
        result: resultCode,
        reason,
        recordedAt: new Date(),
      });
      await this.eventRewardClaimHistoryRepository.insert(
        eventRewardClaimHistory,
      );
    }
  }
}

const isEventConditionMet = (
  condition: EventCondition,
  singleStatus: ProgressStatus,
) => {
  const operations: Record<
    EventComparisonOp,
    (a: number, b: number) => boolean
  > = {
    [EventComparisonOp.EQUAL]: (a, b) => a === b,
    [EventComparisonOp.GTE]: (a, b) => a >= b,
    [EventComparisonOp.LTE]: (a, b) => a <= b,
    [EventComparisonOp.GT]: (a, b) => a > b,
    [EventComparisonOp.LT]: (a, b) => a < b,
  };

  return operations[condition.comparisonOp](
    singleStatus.value,
    Number(condition.value),
  );
};
