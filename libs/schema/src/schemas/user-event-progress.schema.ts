import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {
  ProgressStatus,
  ProgressStatusType,
} from 'apps/event-server/src/event-management/domain/user-event-progress/progress-status';
import { UserEventProgress } from 'apps/event-server/src/event-management/domain/user-event-progress/user-event-progress';
import { Document } from 'mongoose';

@Schema({
  collection: 'user-event-progress',
})
export class UserEventProgressDocument {
  @Prop({ type: String })
  _id: string;

  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  eventId: string;

  @Prop({ required: true, type: [Object] })
  progressStatus: ProgressStatusType[];

  @Prop({ required: true })
  isRewarded: boolean;

  @Prop({ required: true })
  createdAt: Date;

  @Prop({ required: true })
  updatedAt: Date;

  @Prop({ required: false })
  rewardedAt?: Date;

  static fromDomain(
    userEventProgress: UserEventProgress,
  ): UserEventProgressDocument {
    const doc = new UserEventProgressDocument();
    doc._id = userEventProgress.id;
    doc.userId = userEventProgress.userId;
    doc.eventId = userEventProgress.eventId;
    doc.progressStatus = userEventProgress.progressStatus.map((status) =>
      status.toValue(),
    );
    doc.isRewarded = userEventProgress.isRewarded;
    doc.createdAt = userEventProgress.createdAt;
    doc.updatedAt = userEventProgress.updatedAt;
    doc.rewardedAt = userEventProgress.rewardedAt ?? undefined;
    return doc;
  }

  toDomain(): UserEventProgress {
    return UserEventProgress.from(
      {
        userId: this.userId,
        eventId: this.eventId,
        progressStatus: this.progressStatus.map(
          (status) => new ProgressStatus(status),
        ),
        isRewarded: this.isRewarded,
        createdAt: this.createdAt,
        updatedAt: this.updatedAt,
        rewardedAt: this.rewardedAt,
      },
      this._id,
    );
  }
}

export type UserEventProgressModel = UserEventProgressDocument & Document;

export const UserEventProgressSchema = SchemaFactory.createForClass(
  UserEventProgressDocument,
);
