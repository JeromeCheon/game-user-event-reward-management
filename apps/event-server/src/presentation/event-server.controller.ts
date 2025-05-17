import { Controller } from '@nestjs/common';
import { EventServerService } from '../application/event-server.service';
import { EVENT_SERVER_COMMAND } from '@app/common/variable/event-server-command';
import { MessagePattern } from '@nestjs/microservices';
import { CreateEventDto } from '@app/common/dto/create-event-dto';
import { AuthUserInfo } from '@app/common/dto/auth-user-info';

@Controller()
export class EventServerController {
  constructor(private readonly eventServerService: EventServerService) {}

  @MessagePattern({ cmd: EVENT_SERVER_COMMAND.GET_EVENTS })
  async getEvents(): Promise<string[]> {
    return await this.eventServerService.getEvents();
  }

  @MessagePattern({ cmd: EVENT_SERVER_COMMAND.CREATE_EVENT })
  async createEvent({
    createEventDto,
    user,
  }: {
    createEventDto: CreateEventDto;
    user: AuthUserInfo;
  }): Promise<string> {
    return await this.eventServerService.createEvent({ createEventDto, user });
  }
}
