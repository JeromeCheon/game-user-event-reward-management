import { Controller } from '@nestjs/common';
import { EventService } from '../../application/event-management/event.service';
import { EVENT_SERVER_COMMAND } from '@app/common/variable/event-server-command';
import { MessagePattern } from '@nestjs/microservices';
import { CreateEventDto } from '@app/common/dto/create-event-dto';
import { AuthUserInfo } from '@app/common/dto/auth-user-info';
import { EventViewModel } from '@app/common/view-model/event.viewmodel';
import { UpdateEventActiveDto } from '@app/common/dto/update-event-active.dto';

@Controller()
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @MessagePattern({ cmd: EVENT_SERVER_COMMAND.GET_EVENTS })
  async getEvents(user: AuthUserInfo): Promise<EventViewModel[]> {
    return await this.eventService.getEvents(user);
  }

  @MessagePattern({ cmd: EVENT_SERVER_COMMAND.GET_EVENT_BY_ID })
  async getEventById({
    id,
    user,
  }: {
    id: string;
    user: AuthUserInfo;
  }): Promise<EventViewModel> {
    return await this.eventService.getEventById({ id, user });
  }

  @MessagePattern({ cmd: EVENT_SERVER_COMMAND.UPDATE_EVENT_ACTIVE })
  async updateEventActive({
    id,
    dto,
  }: {
    id: string;
    dto: UpdateEventActiveDto;
  }): Promise<boolean> {
    return await this.eventService.updateEventActive({ id, dto });
  }

  @MessagePattern({ cmd: EVENT_SERVER_COMMAND.CREATE_EVENT })
  async createEvent({
    createEventDto,
    user,
  }: {
    createEventDto: CreateEventDto;
    user: AuthUserInfo;
  }): Promise<string> {
    return await this.eventService.createEvent({ createEventDto, user });
  }
}
