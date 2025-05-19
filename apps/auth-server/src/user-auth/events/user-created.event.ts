import { DomainEvent } from '@app/common/base/domain-event';
import { User } from '../domain/user';

export class UserCreatedEvent extends DomainEvent {
  readonly eventName = 'user.created';

  constructor(
    public readonly user: User,
    public readonly recommandorAccount: string,
  ) {
    super();
  }
}
