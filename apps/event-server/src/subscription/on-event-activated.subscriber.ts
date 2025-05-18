import { Inject, Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { EventActivated } from '../domain/domain-events/event-activated.event';
import {
  USER_EVENT_PROGRESS_REPOSITORY,
  UserEventProgressRepository,
} from '../domain/user-event-progress/user-event-progress.repository';
import { UserEventProgress } from '../domain/user-event-progress/user-event-progress';
import { ProgressStatus } from '../domain/user-event-progress/progress-status';
import {
  LOOKUP_USER_REPOSITORY,
  LookupUserRepository,
} from '../domain/user-event-progress/lookup-user-repository';

@Injectable()
export class OnEventActivatedSubscriber {
  private readonly logger = new Logger(OnEventActivatedSubscriber.name);
  constructor(
    @Inject(USER_EVENT_PROGRESS_REPOSITORY)
    private readonly userEventProgressRepository: UserEventProgressRepository,
    @Inject(LOOKUP_USER_REPOSITORY)
    private readonly lookupUserRepository: LookupUserRepository,
  ) {}

  @OnEvent('event.activated', { async: true })
  async handleActivatedTriggerProgressEvent({
    event,
    dateOccurred,
  }: EventActivated): Promise<void> {
    const initialUseProgressList: UserEventProgress[] = [];
    const activeUserIds =
      await this.lookupUserRepository.getUserIdsExceptBanned();

    event.conditions.map((condition) => {
      activeUserIds.map((userId) => {
        initialUseProgressList.push(
          UserEventProgress.create({
            userId,
            eventId: event.id,
            progressStatus: new ProgressStatus({
              conditionType: condition.type,
              value: '0',
            }),
            isCompleted: false,
            isRewarded: false,
            createdAt: dateOccurred,
            updatedAt: dateOccurred,
          }),
        );
      });
    });

    await this.userEventProgressRepository.insertMany(initialUseProgressList);
    this.logger.log(
      ` ${initialUseProgressList.length} 명의 유저에 대해 조건에 따른 총 ${initialUseProgressList.length} 개의 초기 이벤트 진행 상태를 생성했습니다.`,
    );
  }
}
