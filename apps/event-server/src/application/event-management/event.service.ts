import { AuthUserInfo } from '@app/common/dto/auth-user-info';
import { CreateEventDto } from '@app/common/dto/create-event-dto';
import { Inject, Injectable } from '@nestjs/common';
import {
  EVENT_REPOSITORY,
  EventRepository,
} from '../../domain/event/event.repository';
import { Event } from '../../domain/event/event';
import { EventCondition } from '../../domain/event/event-condition';
import { Role } from '@app/common/variable/role';
import { EventViewModel } from '@app/common/view-model/event.viewmodel';
import { RewardRepository } from '../../domain/reward/reward.repository';
import { REWARD_REPOSITORY } from '../../domain/reward/reward.repository';
import { NotFoundEventException } from '@app/common/exception/not-found-event-exception';
import { UpdateEventActiveDto } from '@app/common/dto/update-event-active.dto';

@Injectable()
export class EventService {
  constructor(
    @Inject(EVENT_REPOSITORY)
    private readonly eventRepository: EventRepository,
    @Inject(REWARD_REPOSITORY)
    private readonly rewardRepository: RewardRepository,
  ) {}

  async getEvents({ role }: AuthUserInfo): Promise<EventViewModel[]> {
    const events = await this.eventRepository.findAll();
    if (events.length === 0) {
      return [];
    }

    if (role === Role.USER) {
      const activeEvents = events.filter((event) => event.isActive);
      const activeEventIds = activeEvents.map((event) => event.id);
      const rewards =
        await this.rewardRepository.findByEventIds(activeEventIds);
      return activeEvents.map((event) =>
        EventViewModel.forGameUser(
          event,
          rewards.find((reward) => reward.eventId === event.id)?.items ?? [],
        ),
      );
    }

    const eventIds = events.map((event) => event.id);
    const rewards = await this.rewardRepository.findByEventIds(eventIds);
    return events.map((event) =>
      EventViewModel.forStaffs(
        event,
        rewards.find((reward) => reward.eventId === event.id)?.items ?? [],
      ),
    );
  }

  async getEventById({
    id,
    user,
  }: {
    id: string;
    user: AuthUserInfo;
  }): Promise<EventViewModel> {
    const event = await this.eventRepository.findById(id);

    if (!event) {
      throw new NotFoundEventException(id);
    }

    const rewards = await this.rewardRepository.findByEventIds([id]);
    const rewardItems =
      rewards.find((reward) => reward.eventId === id)?.items || [];

    return user.role === Role.USER
      ? EventViewModel.forGameUser(event, rewardItems)
      : EventViewModel.forStaffs(event, rewardItems);
  }

  async updateEventActive({
    id,
    dto,
  }: {
    id: string;
    dto: UpdateEventActiveDto;
  }): Promise<boolean> {
    const event = await this.eventRepository.findById(id);
    if (!event) {
      throw new NotFoundEventException(id);
    }

    event.updateActiveStatus(dto.isActive);
    await this.eventRepository.update(event);
    return true;
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
      isActive: false,
      createdAt: new Date(),
      updatedAt: new Date(),
      conditions: conditions.map((condition) => new EventCondition(condition)),
    });

    await this.eventRepository.insert(event);

    return event.id;
  }
}
