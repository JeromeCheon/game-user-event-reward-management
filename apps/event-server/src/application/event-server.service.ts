import { AuthUserInfo } from '@app/common/dto/auth-user-info';
import { CreateEventDto } from '@app/common/dto/create-event-dto';
import { Inject, Injectable } from '@nestjs/common';
import { EVENT_REPOSITORY, EventRepository } from '../domain/event.repository';
import { Event } from '../domain/event';
import { EventCondition } from '../domain/event-condition';

@Injectable()
export class EventServerService {
  constructor(
    @Inject(EVENT_REPOSITORY)
    private readonly eventRepository: EventRepository,
  ) {}

  async getEvents(): Promise<string[]> {
    return [];
  }

  async createEvent({
    createEventDto,
    user,
  }: {
    createEventDto: CreateEventDto;
    user: AuthUserInfo;
  }): Promise<string> {
    const { conditions, ...rest } = createEventDto;
    const event = Event.create({
      ...rest,
      creator: { id: user.id, role: user.role },
      rewardIds: [],
      isActive: false,
      createdAt: new Date(),
      updatedAt: new Date(),
      conditions: conditions.map((condition) => new EventCondition(condition)),
    });

    await this.eventRepository.insert(event);

    return event.id;
  }
}
