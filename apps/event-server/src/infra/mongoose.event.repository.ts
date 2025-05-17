import { Injectable } from '@nestjs/common';
import { EventRepository } from '../domain/event.repository';
import { Event } from '../domain/event';

@Injectable()
export class MongooseEventRepository implements EventRepository {
  constructor() {}

  async insert(event: Event): Promise<void> {
    console.log(event);
  }

  async update(event: Event): Promise<void> {
    console.log(event);
  }

  async findById(id: string): Promise<Event | null> {
    console.log(id);
    return null;
  }
}
