import { Inject, Injectable } from '@nestjs/common';
import {
  REWARD_ITEM_REPOSITORY,
  RewardItemRepository,
} from '../domain/reward-item.repository';
import { RewardItemViewModel } from '@app/common/view-model/reward-item.viewmodel';

@Injectable()
export class GetRewardItemsService {
  constructor(
    @Inject(REWARD_ITEM_REPOSITORY)
    private readonly rewardItemRepository: RewardItemRepository,
  ) {}

  async execute(): Promise<RewardItemViewModel[]> {
    const rewardItems = await this.rewardItemRepository.findAll();
    return rewardItems.map((rewardItem) =>
      RewardItemViewModel.from(rewardItem),
    );
  }
}
