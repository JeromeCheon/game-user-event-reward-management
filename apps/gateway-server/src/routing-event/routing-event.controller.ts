import { Controller, Get, Logger, UseFilters, UseGuards } from '@nestjs/common';
import { RoutingEventService } from './routing-event.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CustomHttpExceptionFilter } from '@app/common/exception/custom-http-exception.filter';
import { AuthGuard } from '@nestjs/passport';
import { ApiAuthSecurity } from '@app/common/decorator/api-security';

@ApiTags('Event')
@UseGuards(AuthGuard('jwt'))
@Controller('v1/event')
@UseFilters(CustomHttpExceptionFilter)
export class RoutingEventController {
  private readonly logger = new Logger(RoutingEventController.name);
  constructor(private readonly routingEventService: RoutingEventService) {}

  @Get('all')
  @ApiOperation({ summary: '이벤트 목록 조회' })
  @ApiAuthSecurity()
  async getEvents() {
    const events = await this.routingEventService.getEvents();
    this.logger.log(`이벤트 목록 조회: ${events}`);
    return events;
  }
}
