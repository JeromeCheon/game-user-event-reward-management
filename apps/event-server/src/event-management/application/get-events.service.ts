import { AuthUserInfo } from '@app/common/dto/auth-user-info';
import { Role } from '@app/common/variable/role';
import { EventViewModel } from '@app/common/view-model/event.viewmodel';
import { Inject, Injectable } from '@nestjs/common';
import { EVENT_REPOSITORY, EventRepository } from '../domain/event.repository';
import {
  REWARD_REPOSITORY,
  RewardRepository,
} from '../../reward-management/domain/reward.repository';

@Injectable()
export class GetEventsService {
  constructor(
    @Inject(EVENT_REPOSITORY)
    private readonly eventRepository: EventRepository,
    @Inject(REWARD_REPOSITORY)
    private readonly rewardRepository: RewardRepository,
  ) {}

  async execute({ role }: AuthUserInfo): Promise<EventViewModel[]> {
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
}
