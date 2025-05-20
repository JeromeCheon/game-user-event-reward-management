import { EventRewardClaimHistoryReason } from '@app/common/variable/event-type';
import { EventRewardClaimHistoryResult } from '@app/common/variable/event-type';
import { ValueObject } from '@app/common/base/value-object';

export interface EventRewardClaimHistoryProps {
  eventId: string;
  userId: string;
  result: EventRewardClaimHistoryResult;
  reason: EventRewardClaimHistoryReason;
  recordedAt: Date;
}

export class EventRewardClaimHistory extends ValueObject<EventRewardClaimHistoryProps> {
  constructor(props: EventRewardClaimHistoryProps) {
    super(props);
  }

  get eventId(): string {
    return this.props.eventId;
  }

  get userId(): string {
    return this.props.userId;
  }

  get result(): EventRewardClaimHistoryResult {
    return this.props.result;
  }

  get reason(): EventRewardClaimHistoryReason {
    return this.props.reason;
  }

  get recordedAt(): Date {
    return this.props.recordedAt;
  }
}
