import { Inject, Injectable } from '@nestjs/common';
import {
  REWARD_REPOSITORY,
  RewardRepository,
} from '../../domain/reward/reward.repository';
import { Reward } from '../../domain/reward/reward';
import { CreateRewardDto } from '@app/common/dto/create-reward.dto';
import { EventRepository } from '../../domain/event.repository';
import { EVENT_REPOSITORY } from '../../domain/event.repository';
import { NotFoundEventException } from '@app/common/exception/not-found-event-exception';

@Injectable()
export class RewardService {
  constructor(
    @Inject(REWARD_REPOSITORY)
    private readonly rewardRepository: RewardRepository,
    @Inject(EVENT_REPOSITORY)
    private readonly eventRepository: EventRepository,
  ) {}

  async createReward(dto: CreateRewardDto): Promise<string> {
    const event = await this.eventRepository.findById(dto.eventId);
    if (!event) {
      throw new NotFoundEventException(dto.eventId);
    }

    const reward = Reward.create({
      eventId: dto.eventId,
      type: dto.type,
      rewardItemIds: dto.rewardItemIds,
      quantity: dto.quantity,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    await this.rewardRepository.insert(reward);
    return reward.id;
  }
}
