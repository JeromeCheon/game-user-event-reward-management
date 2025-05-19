import {
  Body,
  Controller,
  Get,
  Logger,
  Param,
  Post,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { RoutingRewardService } from './routing-reward.service';
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
import { RoleGuard } from '@app/common/decorator/role-guard';
import { Roles } from '@app/common/decorator/roles';
import { CreateRewardDto } from '@app/common/dto/create-reward.dto';
import { AuthUserInfo } from '@app/common/dto/auth-user-info';
import { AuthUser } from '@app/common/decorator/auth-user';
import { CreateRewardItemDto } from '@app/common/dto/create-reward-item.dto';
import { RewardItemViewModel } from '@app/common/view-model/reward-item.viewmodel';

@ApiTags('Rewards')
@UseGuards(AuthGuard('jwt'))
@Controller('v1/rewards')
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

  @Post('items')
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

  @Post('claims/:eventId')
  @ApiOperation({ summary: '보상 아이템 청구' })
  @ApiParam({
    name: 'eventId',
    description: '청구할 보상 아이템 ID',
  })
  @ApiResponse({
    status: 200,
    description: '보상 아이템 청구 성공',
  })
  @ApiAuthSecurity()
  @UseGuards(RoleGuard)
  @Roles(Role.USER)
  async claimeReward(
    @Param('eventId') eventId: string,
    @AuthUser() user: AuthUserInfo,
  ) {
    const rewardItems = await this.routingRewardService.claimReward(
      eventId,
      user,
    );
    this.logger.log(
      `${user.role} ${user.id} 님이 보상 아이템을 청구하셨습니다.`,
    );
    return rewardItems;
  }

  @Get('items')
  @ApiOperation({ summary: '보상 아이템 목록 조회' })
  @ApiResponse({
    status: 200,
    description: '보상 아이템 목록 조회 성공',
    type: [RewardItemViewModel],
  })
  @ApiAuthSecurity()
  @UseGuards(RoleGuard)
  @Roles(Role.ADMIN, Role.OPERATOR)
  async getRewardItems(
    @AuthUser() user: AuthUserInfo,
  ): Promise<RewardItemViewModel[]> {
    const rewardItems = await this.routingRewardService.getRewardItems(user);
    this.logger.log(
      `${user.role} ${user.id} 님이 보상 아이템 목록을 조회하셨습니다. 조회된 아이템수: ${rewardItems.length}`,
    );
    return rewardItems;
  }
}
