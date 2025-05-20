import { Inject, Injectable } from '@nestjs/common';
import {
  REWARD_REPOSITORY,
  RewardRepository,
} from '../domain/reward.repository';
import { Reward } from '../domain/reward';
import { CreateRewardDto } from '@app/common/dto/create-reward.dto';
import {
  EventRepository,
  EVENT_REPOSITORY,
} from '../../event-management/domain/event.repository';
import { NotFoundEventException } from '@app/common/exception/not-found-event.exception';
import { RewardItemRepository } from '../domain/reward-item.repository';
import { REWARD_ITEM_REPOSITORY } from '../domain/reward-item.repository';
import { NotFoundRewardItemsException } from '@app/common/exception/not-found-reward-items.exception';

@Injectable()
export class CreateRewardService {
  constructor(
    @Inject(REWARD_REPOSITORY)
    private readonly rewardRepository: RewardRepository,
    @Inject(EVENT_REPOSITORY)
    private readonly eventRepository: EventRepository,
    @Inject(REWARD_ITEM_REPOSITORY)
    private readonly rewardItemRepository: RewardItemRepository,
  ) {}

  async execute(dto: CreateRewardDto): Promise<string> {
    const event = await this.eventRepository.findById(dto.eventId);
    if (!event) {
      throw new NotFoundEventException(dto.eventId);
    }
    const itemIds = dto.items.map((item) => item.rewardItemId);
    const rewardItems = await this.rewardItemRepository.findByIds(itemIds);
    if (rewardItems.length !== itemIds.length) {
      throw new NotFoundRewardItemsException(itemIds);
    }

    const reward = Reward.create({
      eventId: dto.eventId,
      type: dto.type,
      items: rewardItems.map((item) => ({
        type: item.type,
        description: item.description,
        quantity:
          dto.items.find((i) => i.rewardItemId === item.id)?.quantity ?? 0,
      })),
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    event.addRewardId(reward.id);
    await this.rewardRepository.insert(reward);
    await this.eventRepository.update(event);
    return reward.id;
  }
}
