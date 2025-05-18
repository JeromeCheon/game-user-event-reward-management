import { Injectable } from '@nestjs/common';
import { EventRepository } from '../domain/event.repository';
import { Event } from '../domain/event';

import { InjectModel } from '@nestjs/mongoose';
import { EventDocument, EventModel } from '@app/schema/schemas/event.schema';
import { Model } from 'mongoose';

@Injectable()
export class MongooseEventRepository implements EventRepository {
  constructor(
    @InjectModel(EventDocument.name)
    private readonly eventModel: Model<EventModel>,
  ) {}

  async insert(event: Event): Promise<void> {
    const eventDoc = EventDocument.fromDomain(event);
    await this.eventModel.create(eventDoc);
  }

  async update(event: Event): Promise<void> {
    const eventDoc = EventDocument.fromDomain(event);
    await this.eventModel.updateOne({ _id: eventDoc._id }, eventDoc);
  }

  async findById(id: string): Promise<Event | null> {
    const eventDoc = await this.eventModel.findById(id);
    if (!eventDoc) return null;
    return eventDoc.toDomain();
  }
}
