import { Repository } from '@app/common/base/repository';
import { Reward } from './reward';

export const REWARD_REPOSITORY = Symbol('REWARD_REPOSITORY');

export interface RewardRepository extends Repository<Reward> {
  findByEventIds(eventIds: string[]): Promise<Reward[]>;
  findByEventId(eventId: string): Promise<Reward | null>;
}
