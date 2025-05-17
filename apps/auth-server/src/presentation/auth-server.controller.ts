import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AUTH_SERVER_COMMAND } from '@app/common/auth-server-command';
import { CreateGameUserDto } from '@app/common/dto/create-game-user-dto';
import { UserAuthService } from '../application/user-auth.service';
import { AdminAuthService } from '../application/admin-auth.service';
import { AuditorAuthService } from '../application/auditor-auth.service';
import { OperatorAuthService } from '../application/operator-auth.service';
import { CreateUserDto } from '@app/common/dto/create-user-dto';
import { CreateOperatorDto } from '@app/common/dto/create-operator-dto';
import { LoginUserDto } from '@app/common/dto/login-user-dto';
import { UserSessionService } from '../application/user-session-service';
import { AdminSessionService } from '../application/admin-session-service';
import { OperatorSessionService } from '../application/operator-session-service';
import { AuditorSessionService } from '../application/auditor-session-service';

@Controller()
export class AuthServerController {
  constructor(
    private readonly userAuthService: UserAuthService,
    private readonly adminAuthService: AdminAuthService,
    private readonly auditorAuthService: AuditorAuthService,
    private readonly operatorAuthService: OperatorAuthService,
    private readonly userSessionService: UserSessionService,
    private readonly adminSessionService: AdminSessionService,
    private readonly operatorSessionService: OperatorSessionService,
    private readonly auditorSessionService: AuditorSessionService,
  ) {}

  @MessagePattern({ cmd: AUTH_SERVER_COMMAND.CREATE_USER })
  createUser(@Payload() body: CreateGameUserDto): Promise<string> {
    return this.userAuthService.createUser(body);
  }

  @MessagePattern({ cmd: AUTH_SERVER_COMMAND.LOGIN_USER })
  loginUser(@Payload() body: LoginUserDto): Promise<string> {
    return this.userSessionService.loginUser(body);
  }

  @MessagePattern({ cmd: AUTH_SERVER_COMMAND.LOGIN_ADMIN })
  loginAdmin(@Payload() body: LoginUserDto): Promise<string> {
    return this.adminSessionService.loginAdmin(body);
  }

  @MessagePattern({ cmd: AUTH_SERVER_COMMAND.LOGIN_OPERATOR })
  loginOperator(@Payload() body: LoginUserDto): Promise<string> {
    return this.operatorSessionService.loginOperator(body);
  }

  @MessagePattern({ cmd: AUTH_SERVER_COMMAND.LOGIN_AUDITOR })
  loginAuditor(@Payload() body: LoginUserDto): Promise<string> {
    return this.auditorSessionService.loginAuditor(body);
  }

  @MessagePattern({ cmd: AUTH_SERVER_COMMAND.CREATE_ADMIN })
  createAdmin(@Payload() body: CreateUserDto): Promise<string> {
    return this.adminAuthService.createAdmin(body);
  }

  @MessagePattern({ cmd: AUTH_SERVER_COMMAND.CREATE_AUDITOR })
  createAuditor(@Payload() body: CreateUserDto): Promise<string> {
    return this.auditorAuthService.createAuditor(body);
  }

  @MessagePattern({ cmd: AUTH_SERVER_COMMAND.CREATE_OPERATOR })
  createOperator(@Payload() body: CreateOperatorDto): Promise<string> {
    return this.operatorAuthService.createOperator(body);
  }
}
