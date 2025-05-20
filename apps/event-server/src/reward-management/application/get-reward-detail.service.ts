import { Inject, Injectable } from '@nestjs/common';
import {
  REWARD_REPOSITORY,
  RewardRepository,
} from '../domain/reward.repository';
import { RewardViewModel } from '@app/common/view-model/reward.viewmodel';
import { NotFoundRewardException } from '@app/common/exception/not-found-reward.exception';

@Injectable()
export class GetRewardByIdService {
  constructor(
    @Inject(REWARD_REPOSITORY)
    private readonly rewardRepository: RewardRepository,
  ) {}

  async execute(id: string): Promise<RewardViewModel> {
    const reward = await this.rewardRepository.findById(id);
    if (!reward) {
      throw new NotFoundRewardException(id);
    }
    return RewardViewModel.fromDomain(reward);
  }
}
