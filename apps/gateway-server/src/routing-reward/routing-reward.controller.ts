import {
  Body,
  Controller,
  Logger,
  Post,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { RoutingRewardService } from './routing-reward.service';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CustomHttpExceptionFilter } from '@app/common/exception/custom-http-exception.filter';
import { AuthGuard } from '@nestjs/passport';
import { ApiAuthSecurity } from '@app/common/decorator/api-security';
import { Role } from '@app/common/variable/role';
import { RoleGuard } from '@app/common/decorator/role-guard';
import { Roles } from '@app/common/decorator/roles';
import { CreateRewardDto } from '@app/common/dto/create-reward.dto';
import { AuthUserInfo } from '@app/common/dto/auth-user-info';
import { AuthUser } from '@app/common/decorator/auth-user';
import { CreateRewardItemDto } from '@app/common/dto/create-reward-item.dto';

@ApiTags('Reward')
@UseGuards(AuthGuard('jwt'))
@Controller('v1/reward')
@UseFilters(CustomHttpExceptionFilter)
export class RoutingRewardController {
  private readonly logger = new Logger(RoutingRewardController.name);
  constructor(private readonly routingRewardService: RoutingRewardService) {}

  @Post()
  @ApiOperation({ summary: '보상 생성' })
  @ApiBody({ type: CreateRewardDto, description: '보상 생성에 필요한 정보' })
  @ApiAuthSecurity()
  @UseGuards(RoleGuard)
  @Roles(Role.ADMIN, Role.OPERATOR)
  async createReward(
    @Body() createRewardDto: CreateRewardDto,
    @AuthUser() user: AuthUserInfo,
  ): Promise<string> {
    const rewardId =
      await this.routingRewardService.createReward(createRewardDto);
    this.logger.log(
      `${user.role} ${user.id} 님이 보상을 생성하셨습니다. ID: ${rewardId}`,
    );
    return rewardId;
  }

  @Post('item')
  @ApiOperation({ summary: '보상 아이템 생성' })
  @ApiBody({
    type: CreateRewardItemDto,
    description: '보상 아이템 생성에 필요한 정보',
  })
  @ApiAuthSecurity()
  @UseGuards(RoleGuard)
  @Roles(Role.ADMIN, Role.OPERATOR)
  async createRewardItem(
    @Body() createRewardItemDto: CreateRewardItemDto,
    @AuthUser() user: AuthUserInfo,
  ): Promise<string> {
    const rewardItemId =
      await this.routingRewardService.createRewardItem(createRewardItemDto);
    this.logger.log(
      `${user.role} ${user.id} 님이 보상 아이템을 생성하셨습니다. ID: ${rewardItemId}`,
    );
    return rewardItemId;
  }
}
