import { Inject, Injectable } from '@nestjs/common';
import {
  REWARD_ITEM_REPOSITORY,
  RewardItemRepository,
} from '../../domain/reward-item/reward-item.repository';
import { RewardItem } from '../../domain/reward-item/reward-item';
import { CreateRewardItemDto } from '@app/common/dto/create-reward-item.dto';

@Injectable()
export class RewardItemService {
  constructor(
    @Inject(REWARD_ITEM_REPOSITORY)
    private readonly rewardItemRepository: RewardItemRepository,
  ) {}

  async createRewardItem(dto: CreateRewardItemDto): Promise<string> {
    const rewardItem = RewardItem.create({
      type: dto.type,
      description: dto.description,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    await this.rewardItemRepository.insert(rewardItem);
    return rewardItem.id;
  }
}
