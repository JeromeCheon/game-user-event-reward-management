import { AuthUserInfo } from '@app/common/dto/auth-user-info';
import { CreateEventDto } from '@app/common/dto/create-event-dto';
import { Injectable, Inject } from '@nestjs/common';
import { Event } from '../domain/event';
import { EventCondition } from '../domain/event-condition';
import { EVENT_REPOSITORY, EventRepository } from '../domain/event.repository';

@Injectable()
export class CreateEventService {
  constructor(
    @Inject(EVENT_REPOSITORY)
    private readonly eventRepository: EventRepository,
  ) {}

  async execute({
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
      isActive: false,
      createdAt: new Date(),
      updatedAt: new Date(),
      conditions: conditions.map((condition) => new EventCondition(condition)),
    });

    await this.eventRepository.insert(event);

    return event.id;
  }
}
