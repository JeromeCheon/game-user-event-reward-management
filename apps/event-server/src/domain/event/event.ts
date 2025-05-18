import { AggregateRoot } from '@app/common/base/aggregate-root';
import { EventType } from '@app/common/variable/event-type';
import { EventCondition } from './event-condition';
import { EventCreater } from './event-creater';
import { EventActivated } from '../domain-events/event-activated.event';

export interface EventProps {
  name: string;
  description: string;
  type: EventType;
  minLevel: number;
  startDate: Date;
  endDate: Date;
  conditions: EventCondition[];
  creator: EventCreater;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  rewardId?: string;
}

export class Event extends AggregateRoot<EventProps> {
  constructor(props: EventProps, id?: string) {
    super(props, id);
  }
  get name(): string {
    return this.props.name;
  }
  get description(): string {
    return this.props.description;
  }
  get type(): EventType {
    return this.props.type;
  }
  get minLevel(): number {
    return this.props.minLevel;
  }
  get startDate(): Date {
    return this.props.startDate;
  }
  get endDate(): Date {
    return this.props.endDate;
  }
  get conditions(): EventCondition[] {
    return this.props.conditions;
  }
  get rewardId(): string | undefined {
    return this.props.rewardId;
  }
  get creator(): EventCreater {
    return this.props.creator;
  }
  get isActive(): boolean {
    return this.props.isActive;
  }
  get createdAt(): Date {
    return this.props.createdAt;
  }
  get updatedAt(): Date {
    return this.props.updatedAt;
  }

  static create(props: EventProps, id?: string): Event {
    return new Event(props, id);
  }
  static from(props: EventProps, id?: string): Event {
    return new Event(props, id);
  }

  addRewardId(rewardId: string): void {
    this.props.rewardId = rewardId;
    this.props.updatedAt = new Date();
  }

  updateActiveStatus(isActive: boolean): void {
    this.props.isActive = isActive;
    this.props.updatedAt = new Date();
    if (isActive) {
      this.addDomainEvent(new EventActivated(this));
    }
  }
}
