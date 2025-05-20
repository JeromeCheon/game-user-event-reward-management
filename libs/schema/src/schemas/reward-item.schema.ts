import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { RewardItem } from 'apps/event-server/src/reward-management/domain/reward-item';
@Schema({ collection: 'reward-items' })
export class RewardItemDocument {
  @Prop({ type: String })
  _id: string;
  @Prop({ required: true })
  type: string;
  @Prop({ required: true })
  description: string;
  @Prop({ required: true })
  createdAt: Date;
  @Prop({ required: true })
  updatedAt: Date;

  static fromDomain(item: RewardItem): RewardItemDocument {
    const doc = new RewardItemDocument();
    doc._id = item.id;
    doc.type = item.type;
    doc.description = item.description;
    doc.createdAt = item.createdAt;
    doc.updatedAt = item.updatedAt;
    return doc;
  }

  toDomain(): RewardItem {
    return RewardItem.from(
      {
        type: this.type,
        description: this.description,
        createdAt: this.createdAt,
        updatedAt: this.updatedAt,
      },
      this._id,
    );
  }
}

export type RewardItemModel = RewardItemDocument & Document;
export const RewardItemSchema =
  SchemaFactory.createForClass(RewardItemDocument);
