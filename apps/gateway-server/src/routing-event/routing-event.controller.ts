import {
  Body,
  Controller,
  Get,
  Logger,
  Param,
  Patch,
  Post,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { RoutingEventService } from './routing-event.service';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CustomHttpExceptionFilter } from '@app/common/exception/custom-http.exception.filter';
import { AuthGuard } from '@nestjs/passport';
import { ApiAuthSecurity } from '@app/common/decorator/api-security';
import { Role } from '@app/common/variable/role';
import { CreateEventDto } from '@app/common/dto/create-event-dto';
import { RoleGuard } from '@app/common/decorator/role-guard';
import { Roles } from '@app/common/decorator/roles';
import { AuthUser } from '@app/common/decorator/auth-user';
import { AuthUserInfo } from '@app/common/dto/auth-user-info';
import { EventViewModel } from '@app/common/view-model/event.viewmodel';
import { UpdateEventActiveDto } from '@app/common/dto/update-event-active.dto';

@ApiTags('Events')
@UseGuards(AuthGuard('jwt'))
@Controller('v1/events')
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

  @Get()
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

  @Get(':id')
  @ApiOperation({ summary: '이벤트 상세 조회' })
  @ApiParam({
    name: 'id',
    description: '조회할 이벤트 ID',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiResponse({
    status: 200,
    description: '이벤트 조회 성공',
    type: EventViewModel,
  })
  @ApiAuthSecurity()
  @UseGuards(RoleGuard)
  @Roles(Role.ADMIN, Role.OPERATOR, Role.USER)
  async getEventById(@Param('id') id: string, @AuthUser() user: AuthUserInfo) {
    const event = await this.routingEventService.getEventById(id, user);
    this.logger.log(
      `${user.role} ${user.id} 님이 이벤트(ID: ${id})를 조회하셨습니다.`,
    );
    return event;
  }

  @Patch(':id/active')
  @ApiOperation({
    summary: '이벤트 활성화 상태 변경(활성화 시 유저 조건 충족 모니터링 시작)',
  })
  @ApiParam({
    name: 'id',
    description: '수정할 이벤트 ID',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiBody({
    type: UpdateEventActiveDto,
    description: '이벤트 활성화 상태 정보',
  })
  @ApiResponse({
    status: 200,
    description:
      '상태 변경 성공. 활성화 시 이벤트 트리거를 통한 유저의 이벤트 조건 진행도 기록 시작',
    type: Boolean,
  })
  @ApiAuthSecurity()
  @UseGuards(RoleGuard)
  @Roles(Role.ADMIN, Role.OPERATOR)
  async updateEventActive(
    @Param('id') id: string,
    @Body() dto: UpdateEventActiveDto,
    @AuthUser() user: AuthUserInfo,
  ) {
    const result = await this.routingEventService.updateEventActive(id, dto);
    const log = result
      ? `${user.role} ${user.id} 님이 이벤트(ID: ${id})의 활성화 상태를 ${dto.isActive ? '활성화' : '비활성화'}로 변경하셨습니다.`
      : `${user.role} ${user.id} 님이 이벤트(ID: ${id})의 활성화 상태를 변경하지 않았습니다.`;
    this.logger.log(log);
    return result;
  }
}
