import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { EventRewardClaimHistoryResult } from '@app/common/variable/event-type';
import { EventRewardClaimHistoryReason } from '@app/common/variable/event-type';
import { EventRewardClaimHistory } from 'apps/event-server/src/domain/event/event-reward-claim-history';

@Schema({
  collection: 'event-reward-claim-histories',
})
export class EventRewardClaimHistoryDocument {
  @Prop({ required: true })
  eventId: string;

  @Prop({ required: true })
  userId: string;

  @Prop({ required: true, type: String, enum: EventRewardClaimHistoryResult })
  result: EventRewardClaimHistoryResult;

  @Prop({ required: true, type: String, enum: EventRewardClaimHistoryReason })
  reason: EventRewardClaimHistoryReason;

  @Prop({ required: true })
  recordedAt: Date;

  static fromDomain(
    eventRewardClaimHistory: EventRewardClaimHistory,
  ): EventRewardClaimHistoryDocument {
    const document = new EventRewardClaimHistoryDocument();
    document.eventId = eventRewardClaimHistory.eventId;
    document.userId = eventRewardClaimHistory.userId;
    document.result = eventRewardClaimHistory.result;
    document.reason = eventRewardClaimHistory.reason;
    document.recordedAt = eventRewardClaimHistory.recordedAt;
    return document;
  }

  toDomain(): EventRewardClaimHistory {
    return new EventRewardClaimHistory({
      eventId: this.eventId,
      userId: this.userId,
      result: this.result,
      reason: this.reason,
      recordedAt: this.recordedAt,
    });
  }
}

export type EventRewardClaimHistoryModel = EventRewardClaimHistoryDocument &
  Document;
export const EventRewardClaimHistorySchema = SchemaFactory.createForClass(
  EventRewardClaimHistoryDocument,
);
