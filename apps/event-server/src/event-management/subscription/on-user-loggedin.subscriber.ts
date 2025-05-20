import { Controller, Inject, Logger } from '@nestjs/common';
import {
  USER_EVENT_PROGRESS_REPOSITORY,
  UserEventProgressRepository,
} from '../domain/user-event-progress/user-event-progress.repository';
import { UserEventProgress } from '../domain/user-event-progress/user-event-progress';
import { ProgressStatus } from '../domain/user-event-progress/progress-status';
import { EventRepository } from '../domain/event.repository';
import { EVENT_REPOSITORY } from '../domain/event.repository';
import { EventType } from '@app/common/variable/event-type';
import { Event } from '../domain/event';
import { EventPattern } from '@nestjs/microservices';
import { EVENT_SERVER_COMMAND } from '@app/common/variable/event-server-command';

@Controller()
export class OnUserLoggedInSubscriber {
  private readonly logger = new Logger(OnUserLoggedInSubscriber.name);
  constructor(
    @Inject(USER_EVENT_PROGRESS_REPOSITORY)
    private readonly userEventProgressRepository: UserEventProgressRepository,
    @Inject(EVENT_REPOSITORY)
    private readonly eventRepository: EventRepository,
  ) {}

  @EventPattern({ cmd: EVENT_SERVER_COMMAND.AFTER_USER_LOGIN })
  async handle(userId: string) {
    console.log('userId', userId);
    const dateOccurred = new Date();
    const initialUseProgressList: UserEventProgress[] = [];
    const events = await this.eventRepository.findAllActive();
    const existingProgresses =
      await this.userEventProgressRepository.findAllByUserId(userId);

    const existingEventIds = existingProgresses.map(
      (progress) => progress.eventId,
    );
    const newEvents = events.filter(
      (event) => !existingEventIds.includes(event.id),
    );

    newEvents.forEach((event) => {
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
    if (initialUseProgressList.length > 0) {
      await this.userEventProgressRepository.insertMany(initialUseProgressList);
      this.logger.log(
        `${userId} 유저에 대해 ${initialUseProgressList.length}개의 새 이벤트 진행 상태를 생성했습니다.`,
      );
    }
    await this.handleAttendanceEvent(userId, events);
  }

  private async handleAttendanceEvent(userId: string, events: Event[]) {
    const attendanceEvent = events.find(
      (event) => event.type === EventType.ATTENDANCE,
    );
    if (attendanceEvent) {
      const existingProgress =
        await this.userEventProgressRepository.findOneByEventIdAndUserId(
          attendanceEvent.id,
          userId,
        );
      if (existingProgress) {
        existingProgress.updateAttendanceCount();
        await this.userEventProgressRepository.update(existingProgress);
      }
    }
  }
}
