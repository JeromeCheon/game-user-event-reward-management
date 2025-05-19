import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AUTH_SERVER_COMMAND } from '@app/common/variable/auth-server-command';
import { CreateUserDto } from '@app/common/dto/create-user-dto';
import { CreateOperatorDto } from '@app/common/dto/create-operator-dto';
import { LoginUserDto } from '@app/common/dto/login-user-dto';
import { CreateGameUserService } from '../application/create-game-user.service';
import { CreateAdminUserService } from '../application/create-admin-user.service';
import { CreateAuditorUserService } from '../application/create-auditor-user.service';
import { CreateOperatorUserService } from '../application/create-operator-user.service';
import { LoginUserService } from '../application/login-user.service';
import { Role } from '@app/common/variable/role';
import { CreateGameUserDto } from '@app/common/dto/create-game-user-dto';

@Controller()
export class UserAuthController {
  constructor(
    private readonly createGameUserService: CreateGameUserService,
    private readonly createAdminUserService: CreateAdminUserService,
    private readonly createAuditorUserService: CreateAuditorUserService,
    private readonly createOperatorUserService: CreateOperatorUserService,
    private readonly loginUserService: LoginUserService,
  ) {}

  @MessagePattern({ cmd: AUTH_SERVER_COMMAND.CREATE_USER })
  async createUser(dto: CreateGameUserDto): Promise<string> {
    return await this.createGameUserService.execute(dto);
  }

  @MessagePattern({ cmd: AUTH_SERVER_COMMAND.CREATE_ADMIN })
  async createAdmin(dto: CreateUserDto): Promise<string> {
    return await this.createAdminUserService.execute(dto);
  }

  @MessagePattern({ cmd: AUTH_SERVER_COMMAND.CREATE_AUDITOR })
  async createAuditor(dto: CreateUserDto): Promise<string> {
    return await this.createAuditorUserService.execute(dto);
  }

  @MessagePattern({ cmd: AUTH_SERVER_COMMAND.CREATE_OPERATOR })
  async createOperator(dto: CreateOperatorDto): Promise<string> {
    return await this.createOperatorUserService.execute(dto);
  }

  @MessagePattern({ cmd: AUTH_SERVER_COMMAND.LOGIN_USER })
  async loginUser(dto: LoginUserDto): Promise<string> {
    return await this.loginUserService.login(dto, Role.USER);
  }

  @MessagePattern({ cmd: AUTH_SERVER_COMMAND.LOGIN_ADMIN })
  async loginAdmin(dto: LoginUserDto): Promise<string> {
    return await this.loginUserService.login(dto, Role.ADMIN);
  }

  @MessagePattern({ cmd: AUTH_SERVER_COMMAND.LOGIN_AUDITOR })
  async loginAuditor(dto: LoginUserDto): Promise<string> {
    return await this.loginUserService.login(dto, Role.AUDITOR);
  }

  @MessagePattern({ cmd: AUTH_SERVER_COMMAND.LOGIN_OPERATOR })
  async loginOperator(dto: LoginUserDto): Promise<string> {
    return await this.loginUserService.login(dto, Role.OPERATOR);
  }
}
