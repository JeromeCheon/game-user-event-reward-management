import {
  Body,
  Controller,
  Get,
  Logger,
  Post,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { RoutingEventService } from './routing-event.service';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CustomHttpExceptionFilter } from '@app/common/exception/custom-http-exception.filter';
import { AuthGuard } from '@nestjs/passport';
import { ApiAuthSecurity } from '@app/common/decorator/api-security';
import { Role } from '@app/common/variable/role';
import { CreateEventDto } from '@app/common/dto/create-event-dto';
import { RoleGuard } from '@app/common/decorator/role-guard';
import { Roles } from '@app/common/decorator/roles';
import { AuthUser } from '@app/common/decorator/auth-user';
import { AuthUserInfo } from '@app/common/dto/auth-user-info';
import { EventViewModel } from '@app/common/view-model/event.viewmodel';

@ApiTags('Event')
@UseGuards(AuthGuard('jwt'))
@Controller('v1/event')
@UseFilters(CustomHttpExceptionFilter)
export class RoutingEventController {
  private readonly logger = new Logger(RoutingEventController.name);
  constructor(private readonly routingEventService: RoutingEventService) {}

  @Post()
  @ApiOperation({ summary: '이벤트 생성' })
  @ApiBody({ type: CreateEventDto, description: '이벤트 생성에 필요한 정보' })
  @ApiAuthSecurity()
  @UseGuards(RoleGuard)
  @Roles(Role.ADMIN, Role.OPERATOR)
  async createEvent(
    @Body() createEventDto: CreateEventDto,
    @AuthUser() user: AuthUserInfo,
  ) {
    const eventId = await this.routingEventService.createEvent({
      createEventDto,
      user,
    });
    this.logger.log(
      `${user.role} ${user.id} 님이 이벤트 생성하셨습니다. ID: ${eventId}`,
    );
    return eventId;
  }

  @Get('all')
  @ApiOperation({ summary: '이벤트 목록 조회' })
  @ApiResponse({
    status: 200,
    description: '이벤트 목록 조회 성공',
    type: [EventViewModel],
  })
  @ApiAuthSecurity()
  @UseGuards(RoleGuard)
  @Roles(Role.ADMIN, Role.OPERATOR, Role.USER)
  async getEvents(@AuthUser() user: AuthUserInfo) {
    const events = await this.routingEventService.getEvents(user);
    this.logger.log(
      `${user.role} ${user.id} 님이 이벤트 목록을 조회하셨습니다. 조회된 이벤트수: ${events.length}`,
    );
    return events;
  }
}
