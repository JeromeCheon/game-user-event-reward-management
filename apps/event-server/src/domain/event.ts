import { AggregateRoot } from '@app/common/base/aggregate-root';

export interface EventProps {
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
}

export class Event extends AggregateRoot<EventProps> {
  constructor(props: EventProps) {
    super(props);
  }
}
