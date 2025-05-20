import { AggregateRoot } from '@app/common/base/aggregate-root';
import { ProgressStatus } from './progress-status';

interface UserEventProgressProps {
  userId: string;
  eventId: string;
  progressStatus: ProgressStatus[];
  isRewarded: boolean;
  createdAt: Date;
  updatedAt: Date;
  rewardedAt?: Date;
}

export class UserEventProgress extends AggregateRoot<UserEventProgressProps> {
  constructor(props: UserEventProgressProps, id?: string) {
    super(props, id);
  }

  static create(props: UserEventProgressProps, id?: string) {
    return new UserEventProgress(props, id);
  }

  static from(props: UserEventProgressProps, id?: string) {
    return new UserEventProgress(props, id);
  }

  get userId() {
    return this.props.userId;
  }

  get eventId() {
    return this.props.eventId;
  }

  get progressStatus() {
    return this.props.progressStatus;
  }

  get isRewarded() {
    return this.props.isRewarded;
  }

  get rewardedAt() {
    return this.props.rewardedAt;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }

  approveReward() {
    this.props.isRewarded = true;
    this.props.rewardedAt = new Date();
    this.props.updatedAt = new Date();
  }
}
