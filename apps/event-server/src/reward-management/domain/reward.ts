import { AggregateRoot } from '@app/common/base/aggregate-root';
import { RewardType } from './reward-type';
import { RewardItemInfo } from './reward-item-info';

export interface RewardProps {
  eventId: string;
  type: RewardType;
  items: RewardItemInfo[];
  createdAt: Date;
  updatedAt: Date;
}

export class Reward extends AggregateRoot<RewardProps> {
  constructor(props: RewardProps, id?: string) {
    super(props, id);
  }

  static create(props: RewardProps, id?: string): Reward {
    return new Reward(props, id);
  }

  static from(props: RewardProps, id?: string): Reward {
    return new Reward(props, id);
  }

  get eventId(): string {
    return this.props.eventId;
  }

  get type(): RewardType {
    return this.props.type;
  }

  get items(): RewardItemInfo[] {
    return this.props.items;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }
}
