import { Body, Controller, Logger, Post, UseFilters } from '@nestjs/common';
import { IdentityAccessService } from './identity-access.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CustomHttpExceptionFilter } from '@app/common/exception/custom-http.exception.filter';
import { CreateUserDto } from '@app/common/dto/create-user-dto';
import { CreateOperatorDto } from '@app/common/dto/create-operator-dto';
import { LoginUserDto } from '@app/common/dto/login-user-dto';
import { CreateGameUserDto } from '@app/common/dto/create-game-user-dto';

@ApiTags('Auth')
@Controller('v1/auth')
@UseFilters(CustomHttpExceptionFilter)
export class IdentityAccessController {
  private readonly logger = new Logger(IdentityAccessController.name);
  constructor(private readonly identityAccessService: IdentityAccessService) {}

  @Post('users')
  @ApiOperation({ summary: '유저 생성' })
  async createUser(@Body() body: CreateGameUserDto): Promise<string> {
    const id = await this.identityAccessService.createUser(body);
    this.logger.log(`게임 유저가 생성되었습니다. id: ${id}`);
    return id;
  }

  @Post('login')
  @ApiOperation({ summary: '유저 로그인' })
  async loginUser(@Body() body: LoginUserDto): Promise<string> {
    const token = await this.identityAccessService.loginUser(body);
    this.logger.log(`게임 유저 ${body.name} 님이 접속 하셨습니다.`);
    return token;
  }

  @Post('admins')
  @ApiOperation({ summary: '관리자 생성' })
  async createAdmin(@Body() body: CreateUserDto): Promise<string> {
    const id = await this.identityAccessService.createAdmin(body);
    this.logger.log(`관리자가 생성되었습니다. id: ${id}`);
    return id;
  }

  @Post('admins/login')
  @ApiOperation({ summary: '관리자 로그인' })
  async loginAdmin(@Body() body: LoginUserDto): Promise<string> {
    const token = await this.identityAccessService.loginAdmin(body);
    this.logger.log(`관리자 ${body.name} 님이 접속 하셨습니다.`);
    return token;
  }

  @Post('auditors')
  @ApiOperation({ summary: '감사자 생성' })
  async createAuditor(@Body() body: CreateUserDto): Promise<string> {
    const id = await this.identityAccessService.createAuditor(body);
    this.logger.log(`감사자가 생성되었습니다. id: ${id}`);
    return id;
  }

  @Post('auditors/login')
  @ApiOperation({ summary: '감사자 로그인' })
  async loginAuditor(@Body() body: LoginUserDto): Promise<string> {
    const token = await this.identityAccessService.loginAuditor(body);
    this.logger.log(`감사자 ${body.name} 님이 접속 하셨습니다.`);
    return token;
  }

  @Post('operators')
  @ApiOperation({ summary: '운영자 생성' })
  async createOperator(@Body() body: CreateOperatorDto): Promise<string> {
    const id = await this.identityAccessService.createOperator(body);
    this.logger.log(`운영자가 생성되었습니다. id: ${id}`);
    return id;
  }

  @Post('operators/login')
  @ApiOperation({ summary: '운영자 로그인' })
  async loginOperator(@Body() body: LoginUserDto): Promise<string> {
    const token = await this.identityAccessService.loginOperator(body);
    this.logger.log(`운영자 ${body.name} 님이 접속 하셨습니다.`);
    return token;
  }
}
