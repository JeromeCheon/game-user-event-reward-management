import { Controller } from '@nestjs/common';
import { EVENT_SERVER_COMMAND } from '@app/common/variable/event-server-command';
import { MessagePattern } from '@nestjs/microservices';
import { CreateEventDto } from '@app/common/dto/create-event-dto';
import { AuthUserInfo } from '@app/common/dto/auth-user-info';
import { EventViewModel } from '@app/common/view-model/event.viewmodel';
import { UpdateEventActiveDto } from '@app/common/dto/update-event-active.dto';
import { GetEventsService } from '../application/get-events.service';
import { GetEventDetailService } from '../application/get-event-detail.service';
import { UpdateEventActiveService } from '../application/update-event-active.service';
import { CreateEventService } from '../application/create-event.service';

@Controller()
export class EventController {
  constructor(
    private readonly getEventsService: GetEventsService,
    private readonly getEventByIdService: GetEventDetailService,
    private readonly updateEventActiveService: UpdateEventActiveService,
    private readonly createEventService: CreateEventService,
  ) {}

  @MessagePattern({ cmd: EVENT_SERVER_COMMAND.GET_EVENTS })
  async getEvents(user: AuthUserInfo): Promise<EventViewModel[]> {
    return await this.getEventsService.execute(user);
  }

  @MessagePattern({ cmd: EVENT_SERVER_COMMAND.GET_EVENT_BY_ID })
  async getEventById({
    id,
    user,
  }: {
    id: string;
    user: AuthUserInfo;
  }): Promise<EventViewModel> {
    return await this.getEventByIdService.execute({ id, user });
  }

  @MessagePattern({ cmd: EVENT_SERVER_COMMAND.UPDATE_EVENT_ACTIVE })
  async updateEventActive({
    id,
    dto,
  }: {
    id: string;
    dto: UpdateEventActiveDto;
  }): Promise<boolean> {
    return await this.updateEventActiveService.execute({ id, dto });
  }

  @MessagePattern({ cmd: EVENT_SERVER_COMMAND.CREATE_EVENT })
  async createEvent({
    createEventDto,
    user,
  }: {
    createEventDto: CreateEventDto;
    user: AuthUserInfo;
  }): Promise<string> {
    return await this.createEventService.execute({ createEventDto, user });
  }
}
