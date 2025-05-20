import { Repository } from '@app/common/base/repository';
import { Event } from './event';

export const EVENT_REPOSITORY = Symbol('EVENT_REPOSITORY');

export interface EventRepository extends Repository<Event> {
  findAll(): Promise<Event[]>;
  findById(id: string): Promise<Event | null>;
  findAllActive(): Promise<Event[]>;
}
