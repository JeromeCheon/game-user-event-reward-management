import { Inject, Injectable } from '@nestjs/common';
import {
  REWARD_REPOSITORY,
  RewardRepository,
} from '../domain/reward.repository';
import { RewardViewModel } from '@app/common/view-model/reward.viewmodel';

@Injectable()
export class GetRewardsService {
  constructor(
    @Inject(REWARD_REPOSITORY)
    private readonly rewardRepository: RewardRepository,
  ) {}

  async execute(): Promise<RewardViewModel[]> {
    const rewards = await this.rewardRepository.findAll();
    return rewards.map(RewardViewModel.fromDomain);
  }
}
