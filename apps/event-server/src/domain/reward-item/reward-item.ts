import { AggregateRoot } from '@app/common/base/aggregate-root';

export interface RewardItemProps {
  type: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

export class RewardItem extends AggregateRoot<RewardItemProps> {
  constructor(props: RewardItemProps, id?: string) {
    super(props, id);
  }

  static create(props: RewardItemProps, id?: string): RewardItem {
    return new RewardItem(props, id);
  }

  static from(props: RewardItemProps, id?: string): RewardItem {
    return new RewardItem(props, id);
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
