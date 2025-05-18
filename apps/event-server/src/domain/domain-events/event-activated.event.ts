import { DomainEvent } from '@app/common/base/domain-event';
import { Event } from '../event/event';

export class EventActivated extends DomainEvent {
  readonly eventName = 'event.activated';

  constructor(public readonly event: Event) {
    super();
  }
}
