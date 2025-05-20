import { UpdateEventActiveDto } from '@app/common/dto/update-event-active.dto';
import { InvalidEventRewardException } from '@app/common/exception/invalid-event-reward.exception';
import { NotFoundEventException } from '@app/common/exception/not-found-event.exception';
import { Injectable, Inject } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { EVENT_REPOSITORY, EventRepository } from '../domain/event.repository';

@Injectable()
export class UpdateEventActiveService {
  constructor(
    @Inject(EVENT_REPOSITORY)
    private readonly eventRepository: EventRepository,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async execute({
    id,
    dto,
  }: {
    id: string;
    dto: UpdateEventActiveDto;
  }): Promise<boolean> {
    const event = await this.eventRepository.findById(id);
    if (!event) {
      throw new NotFoundEventException(id);
    }

    if (!event.rewardId) {
      throw new InvalidEventRewardException(id);
    }

    if (event.isActive === dto.isActive) {
      return false;
    }

    event.updateActiveStatus(dto.isActive);
    await this.eventRepository.update(event);

    if (dto.isActive) {
      this.eventEmitter.emit('event.activated', { event });
    }
    event.clearEvents();

    return true;
  }
}
