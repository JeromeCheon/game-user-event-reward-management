import { Body, Controller, Logger, Post, UseFilters } from '@nestjs/common';
import { IdentityAccessService } from './identity-access.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CustomHttpExceptionFilter } from '@app/common/exception/custom-http-exception.filter';
import { CreateGameUserDto } from '@app/common/dto/create-game-user-dto';
import { CreateUserDto } from '@app/common/dto/create-user-dto';
import { CreateOperatorDto } from '@app/common/dto/create-operator-dto';

@ApiTags('v1/auth')
@Controller('v1/auth')
@UseFilters(CustomHttpExceptionFilter)
export class IdentityAccessController {
  private readonly logger = new Logger(IdentityAccessController.name);
  constructor(private readonly identityAccessService: IdentityAccessService) {}

  @Post('user')
  @ApiOperation({ summary: '유저 생성' })
  async createUser(@Body() body: CreateGameUserDto): Promise<string> {
    const id = await this.identityAccessService.createUser(body);
    this.logger.log(`게임 유저가 생성되었습니다. id: ${id}`);
    return id;
  }

  @Post('admin')
  @ApiOperation({ summary: '관리자 생성' })
  async createAdmin(@Body() body: CreateUserDto): Promise<string> {
    const id = await this.identityAccessService.createAdmin(body);
    this.logger.log(`관리자가 생성되었습니다. id: ${id}`);
    return id;
  }

  @Post('auditor')
  @ApiOperation({ summary: '감사자 생성' })
  async createAuditor(@Body() body: CreateUserDto): Promise<string> {
    const id = await this.identityAccessService.createAuditor(body);
    this.logger.log(`감사자가 생성되었습니다. id: ${id}`);
    return id;
  }

  @Post('operator')
  @ApiOperation({ summary: '운영자 생성' })
  async createOperator(@Body() body: CreateOperatorDto): Promise<string> {
    const id = await this.identityAccessService.createOperator(body);
    this.logger.log(`운영자가 생성되었습니다. id: ${id}`);
    return id;
  }
}
