import { AuthUserInfo } from '@app/common/dto/auth-user-info';
import { CreateEventDto } from '@app/common/dto/create-event-dto';
import { Inject, Injectable } from '@nestjs/common';
import { EVENT_REPOSITORY, EventRepository } from '../domain/event.repository';

@Injectable()
export class EventServerService {
  constructor(
    @Inject(EVENT_REPOSITORY)
    private readonly eventRepository: EventRepository,
  ) {}
  async getEvents(): Promise<string[]> {
    return [];
  }

  async createEvent(prop: {
    createEventDto: CreateEventDto;
    user: AuthUserInfo;
  }): Promise<string> {
    console.log(prop);
    return 'test';
  }
}
