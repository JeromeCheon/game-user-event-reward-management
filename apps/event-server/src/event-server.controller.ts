import { Controller } from '@nestjs/common';
import { EventServerService } from './event-server.service';
import { EVENT_SERVER_COMMAND } from '@app/common/event-server-command';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class EventServerController {
  constructor(private readonly eventServerService: EventServerService) {}

  @MessagePattern({ cmd: EVENT_SERVER_COMMAND.GET_EVENTS })
  async getEvents(): Promise<string[]> {
    return await this.eventServerService.getEvents();
  }
}
