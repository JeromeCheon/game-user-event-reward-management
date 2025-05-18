import { AggregateRoot } from '@app/common/base/aggregate-root';

export interface RewardItemProps {
  type: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

export class RewardItem extends AggregateRoot<RewardItemProps> {
  constructor(props: RewardItemProps) {
    super(props);
  }

  static create(props: RewardItemProps): RewardItem {
    return new RewardItem(props);
  }

  static from(props: RewardItemProps): RewardItem {
    return new RewardItem(props);
  }

  get type(): string {
    return this.props.type;
  }
  get description(): string {
    return this.props.description;
  }
  get createdAt(): Date {
    return this.props.createdAt;
  }
  get updatedAt(): Date {
    return this.props.updatedAt;
  }
}
