import { AggregateRoot } from '@app/common/base/aggregate-root';
import { RewardType } from './reward-type';

export interface RewardProps {
  eventId: string;
  type: RewardType;
  quantity: number;
  rewardItemIds: string[];
  createdAt: Date;
  updatedAt: Date;
}

export class Reward extends AggregateRoot<RewardProps> {
  constructor(props: RewardProps) {
    super(props);
  }

  static create(props: RewardProps): Reward {
    // TODO: 보상 생성 시 연결된 이벤트로 상태 갱신 event 추가
    return new Reward(props);
  }

  static from(props: RewardProps): Reward {
    return new Reward(props);
  }

  get eventId(): string {
    return this.props.eventId;
  }

  get type(): RewardType {
    return this.props.type;
  }

  get rewardItemIds(): string[] {
    return this.props.rewardItemIds;
  }

  get quantity(): number {
    return this.props.quantity;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }
}
