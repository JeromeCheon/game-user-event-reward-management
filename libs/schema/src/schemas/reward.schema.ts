import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Reward } from 'apps/event-server/src/domain/reward/reward';
import { RewardType } from 'apps/event-server/src/domain/reward/reward-type';
import { Document } from 'mongoose';

@Schema({ collection: 'rewards' })
export class RewardDocument {
  @Prop({ type: String })
  _id: string;

  @Prop({ required: true })
  eventId: string;

  @Prop({ required: true })
  type: string;

  @Prop({ required: true })
  quantity: number;

  @Prop({ required: true })
  rewardItemIds: string[];

  @Prop({ required: true })
  createdAt: Date;

  @Prop({ required: true })
  updatedAt: Date;

  static fromDomain(reward: Reward): RewardDocument {
    const doc = new RewardDocument();
    doc._id = reward.id;
    doc.eventId = reward.eventId;
    doc.type = reward.type;
    doc.quantity = reward.quantity;
    doc.rewardItemIds = reward.rewardItemIds;
    doc.createdAt = reward.createdAt;
    doc.updatedAt = reward.updatedAt;

    return doc;
  }

  toDomain(): Reward {
    return Reward.from({
      eventId: this.eventId,
      type: this.type as RewardType,
      quantity: this.quantity,
      rewardItemIds: this.rewardItemIds,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    });
  }
}

export type RewardModel = RewardDocument & Document;
export const RewardSchema = SchemaFactory.createForClass(RewardDocument);
