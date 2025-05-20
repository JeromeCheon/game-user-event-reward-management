import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Reward } from 'apps/event-server/src/reward-management/domain/reward';
import { RewardType } from 'apps/event-server/src/reward-management/domain/reward-type';
import { RewardItemInfo } from 'apps/event-server/src/reward-management/domain/reward-item-info';
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
  items: RewardItemInfo[];

  @Prop({ required: true })
  createdAt: Date;

  @Prop({ required: true })
  updatedAt: Date;

  static fromDomain(reward: Reward): RewardDocument {
    const doc = new RewardDocument();
    doc._id = reward.id;
    doc.eventId = reward.eventId;
    doc.type = reward.type;
    doc.items = reward.items;
    doc.createdAt = reward.createdAt;
    doc.updatedAt = reward.updatedAt;

    return doc;
  }

  toDomain(): Reward {
    return Reward.from(
      {
        eventId: this.eventId,
        type: this.type as RewardType,
        items: this.items,
        createdAt: this.createdAt,
        updatedAt: this.updatedAt,
      },
      this._id,
    );
  }
}

export type RewardModel = RewardDocument & Document;
export const RewardSchema = SchemaFactory.createForClass(RewardDocument);
