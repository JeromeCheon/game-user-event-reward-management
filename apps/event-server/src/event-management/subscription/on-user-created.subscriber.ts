import { Controller, Inject, Logger } from '@nestjs/common';
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
import { EventRepository } from '../domain/event.repository';
import { EVENT_REPOSITORY } from '../domain/event.repository';
import { EventType } from '@app/common/variable/event-type';
import { Event } from '../domain/event';
import { EventPattern } from '@nestjs/microservices';
import { EVENT_SERVER_COMMAND } from '@app/common/variable/event-server-command';

@Controller()
export class OnUserCreatedSubscriber {
  private readonly logger = new Logger(OnUserCreatedSubscriber.name);
  constructor(
    @Inject(USER_EVENT_PROGRESS_REPOSITORY)
    private readonly userEventProgressRepository: UserEventProgressRepository,
    @Inject(LOOKUP_USER_REPOSITORY)
    private readonly lookupUserRepository: LookupUserRepository,
    @Inject(EVENT_REPOSITORY)
    private readonly eventRepository: EventRepository,
  ) {}

  @EventPattern({ cmd: EVENT_SERVER_COMMAND.AFTER_USER_CREATED })
  async handle({
    userId,
    recommandorName,
  }: {
    userId: string;
    recommandorName: string;
  }) {
    const events = await this.eventRepository.findAllActive();
    await this.handleRecommandEvent(recommandorName, events);
    const dateOccurred = new Date();
    const initialUseProgressList: UserEventProgress[] = [];
    const newbieEvents = events.filter((event) => event.minLevel === 1);

    newbieEvents.map((event) => {
      initialUseProgressList.push(
        UserEventProgress.create({
          userId,
          eventId: event.id,
          progressStatus: event.conditions.map((condition) => {
            return new ProgressStatus({
              conditionType: condition.type,
              value: 0,
            });
          }),
          isRewarded: false,
          createdAt: dateOccurred,
          updatedAt: dateOccurred,
        }),
      );
    });
    await this.userEventProgressRepository.insertMany(initialUseProgressList);
    this.logger.log(
      ` ${initialUseProgressList.length} 명의 유저에 대해 조건에 따른 총 ${initialUseProgressList.length} 개의 초기 이벤트 진행 상태를 생성했습니다.`,
    );
  }

  private async handleRecommandEvent(recommandorName: string, events: Event[]) {
    const recommandorId =
      await this.lookupUserRepository.getUserIdByName(recommandorName);
    if (recommandorId) {
      const recommandEvent = events.find(
        (event) => event.type === EventType.RECOMMEND_FRIEND,
      );
      if (recommandEvent) {
        const existingProgress =
          await this.userEventProgressRepository.findOneByEventIdAndUserId(
            recommandEvent.id,
            recommandorId,
          );
        if (existingProgress) {
          existingProgress.updateRecommandCount();
          await this.userEventProgressRepository.update(existingProgress);
        } else {
          const newProgress = UserEventProgress.create({
            userId: recommandorId,
            eventId: recommandEvent.id,
            progressStatus: recommandEvent.conditions.map((condition) => {
              return new ProgressStatus({
                conditionType: condition.type,
                value: 0,
              });
            }),
            isRewarded: false,
            createdAt: new Date(),
            updatedAt: new Date(),
          });
          newProgress.updateRecommandCount();
          await this.userEventProgressRepository.insert(newProgress);
        }
        this.logger.log(`추천인에 대한 이벤트 진행 상태를 생성/갱신 했습니다.`);
      }
    }
  }
}
