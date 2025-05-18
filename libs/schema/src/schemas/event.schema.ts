import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Event } from 'apps/event-server/src/domain/event';
import { EventCondition } from 'apps/event-server/src/domain/event-condition';
import { EventType } from '@app/common/variable/event-type';
import { EventCreater } from 'apps/event-server/src/domain/event-creater';
import { EventConditionDto } from '@app/common/dto/create-event-dto';

@Schema({
  collection: 'events',
})
export class EventDocument {
  @Prop({ type: String })
  _id: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  type: string;

  @Prop({ required: true })
  minLevel: number;

  @Prop({ required: true })
  startDate: Date;

  @Prop({ required: true })
  endDate: Date;

  @Prop({ required: true })
  conditions: EventConditionDto[];

  @Prop({ required: true, type: [String] })
  rewardIds: string[];

  @Prop({ required: true, type: Object })
  creator: EventCreater;

  @Prop({ required: true })
  isActive: boolean;

  @Prop({ required: true })
  createdAt: Date;

  @Prop({ required: true })
  updatedAt: Date;

  static fromDomain(event: Event): EventDocument {
    const doc = new EventDocument();
    doc._id = event.id;
    doc.name = event.name;
    doc.description = event.description;
    doc.type = event.type;
    doc.minLevel = event.minLevel;
    doc.startDate = event.startDate;
    doc.endDate = event.endDate;
    doc.conditions = event.conditions.map((condition) => condition.toValue());
    doc.rewardIds = event.rewardIds;
    doc.isActive = event.isActive;
    doc.createdAt = event.createdAt;
    doc.updatedAt = event.updatedAt;
    doc.creator = event.creator;

    return doc;
  }

  toDomain(): Event {
    return Event.from(
      {
        name: this.name,
        description: this.description,
        type: this.type as EventType,
        minLevel: this.minLevel,
        startDate: this.startDate,
        endDate: this.endDate,
        conditions: this.conditions.map(
          (condition) => new EventCondition(condition),
        ),
        rewardIds: this.rewardIds,
        creator: this.creator,
        isActive: this.isActive,
        createdAt: this.createdAt,
        updatedAt: this.updatedAt,
      },
      this._id,
    );
  }
}

export type EventModel = EventDocument & Document;
export const EventSchema = SchemaFactory.createForClass(EventDocument);
