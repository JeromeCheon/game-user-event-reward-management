import { Repository } from '@app/common/base/repository';
import { UserEventProgress } from './user-event-progress';

export const USER_EVENT_PROGRESS_REPOSITORY = Symbol(
  'USER_EVENT_PROGRESS_REPOSITORY',
);

export interface UserEventProgressRepository
  extends Repository<UserEventProgress> {
  insertMany(progresses: UserEventProgress[]): Promise<void>;
  updateWithLock(
    entity: UserEventProgress,
    prevUpdatedAt: Date,
  ): Promise<boolean>;
  findOneByEventIdAndUserId(
    eventId: string,
    userId: string,
  ): Promise<UserEventProgress | null>;

  findAllByUserId(userId: string): Promise<UserEventProgress[]>;
}
