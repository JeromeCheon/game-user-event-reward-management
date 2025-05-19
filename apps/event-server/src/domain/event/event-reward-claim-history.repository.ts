import { EventRewardClaimHistory } from './event-reward-claim-history';

export const EVENT_REWARD_CLAIM_HISTORY_REPOSITORY = Symbol(
  'EVENT_REWARD_CLAIM_HISTORY_REPOSITORY',
);

export interface EventRewardClaimHistoryRepository {
  insert(eventRewardClaimHistory: EventRewardClaimHistory): Promise<void>;
}
