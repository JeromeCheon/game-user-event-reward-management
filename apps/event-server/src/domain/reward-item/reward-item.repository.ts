import { Repository } from '@app/common/base/repository';
import { RewardItem } from './reward-item';

export const REWARD_ITEM_REPOSITORY = Symbol('REWARD_ITEM_REPOSITORY');

export interface RewardItemRepository extends Repository<RewardItem> {
  findAll(): Promise<RewardItem[]>;
}
