import { ApiProperty } from '@nestjs/swagger';
import {
  EventRewardClaimHistoryReason,
  EventRewardClaimHistoryResult,
} from '../variable/event-type';
import { EventRewardClaimHistory } from 'apps/event-server/src/domain/event/event-reward-claim-history';

export class RewardClaimHistoryViewModel {
  @ApiProperty({
    description: '이벤트 ID',
    example: '6499a8e60c75926a00f6b7c1',
  })
  eventId: string;

  @ApiProperty({
    description: '사용자 ID',
    example: '6499a8e60c75926a00f6b7c2',
  })
  userId: string;

  @ApiProperty({
    description: '보상 청구 결과',
    enum: EventRewardClaimHistoryResult,
    example: EventRewardClaimHistoryResult.APPROVED,
  })
  result: EventRewardClaimHistoryResult;

  @ApiProperty({
    description: '보상 청구 처리 이유',
    enum: EventRewardClaimHistoryReason,
    example: EventRewardClaimHistoryReason.QUALIFIED,
  })
  reason: EventRewardClaimHistoryReason;

  @ApiProperty({
    description: '기록 일시',
    example: '2023-06-26T14:35:50.000Z',
  })
  recordedAt: Date;

  static fromDomain(
    eventRewardClaimHistory: EventRewardClaimHistory,
  ): RewardClaimHistoryViewModel {
    const viewModel = new RewardClaimHistoryViewModel();
    viewModel.eventId = eventRewardClaimHistory.eventId;
    viewModel.userId = eventRewardClaimHistory.userId;
    viewModel.result = eventRewardClaimHistory.result;
    viewModel.reason = eventRewardClaimHistory.reason;
    viewModel.recordedAt = eventRewardClaimHistory.recordedAt;
    return viewModel;
  }
}
