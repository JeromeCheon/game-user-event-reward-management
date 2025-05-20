import { AuthUserInfo } from '@app/common/dto/auth-user-info';
import { NotFoundEventException } from '@app/common/exception/not-found-event.exception';
import { UnauthorizedAccessEventException } from '@app/common/exception/unauthorized-access-event.exception';
import { Role } from '@app/common/variable/role';
import { EventViewModel } from '@app/common/view-model/event.viewmodel';
import { Injectable, Inject } from '@nestjs/common';
import { EVENT_REPOSITORY, EventRepository } from '../domain/event.repository';
import {
  REWARD_REPOSITORY,
  RewardRepository,
} from '../../reward-management/domain/reward.repository';

@Injectable()
export class GetEventDetailService {
  constructor(
    @Inject(EVENT_REPOSITORY)
    private readonly eventRepository: EventRepository,
    @Inject(REWARD_REPOSITORY)
    private readonly rewardRepository: RewardRepository,
  ) {}

  async execute({
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

    if (user.role === Role.USER && !event.isActive) {
      throw new UnauthorizedAccessEventException(id, user.id);
    }

    const reward = await this.rewardRepository.findByEventId(id);
    const rewardItems = reward?.items || [];

    return user.role === Role.USER
      ? EventViewModel.forGameUser(event, rewardItems)
      : EventViewModel.forStaffs(event, rewardItems);
  }
}
