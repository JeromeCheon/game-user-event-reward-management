import { AuthUserInfo } from '@app/common/dto/auth-user-info';
import { EVENT_SERVER_COMMAND } from '@app/common/variable/event-server-command';
import { EVENT_SERVER } from '@app/common/variable/symbols';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { UpdateEventActiveDto } from '@app/common/dto/update-event-active.dto';

@Injectable()
export class RoutingEventService {
  constructor(
    @Inject(EVENT_SERVER) private readonly eventClient: ClientProxy,
  ) {}

  async getEvents(user: AuthUserInfo) {
    return await firstValueFrom(
      this.eventClient.send({ cmd: EVENT_SERVER_COMMAND.GET_EVENTS }, user),
    );
  }

  async getEventById(id: string, user: AuthUserInfo) {
    return await firstValueFrom(
      this.eventClient.send(
        { cmd: EVENT_SERVER_COMMAND.GET_EVENT_BY_ID },
        { id, user },
      ),
    );
  }

  async updateEventActive(id: string, dto: UpdateEventActiveDto) {
    return await firstValueFrom(
      this.eventClient.send(
        { cmd: EVENT_SERVER_COMMAND.UPDATE_EVENT_ACTIVE },
        { id, dto },
      ),
    );
  }

  async createEvent(dto: unknown) {
    return await firstValueFrom(
      this.eventClient.send({ cmd: EVENT_SERVER_COMMAND.CREATE_EVENT }, dto),
    );
  }
}
