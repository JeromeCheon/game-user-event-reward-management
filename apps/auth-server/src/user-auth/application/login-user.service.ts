import { Inject, Injectable } from '@nestjs/common';
import { LoginUserDto } from '@app/common/dto/login-user-dto';
import { NotFoundUserException } from '@app/common/exception/not-found-user.exception';
import { InvalidPasswordException } from '@app/common/exception/invalid-password.exception';
import { AlreadyLoggedInException } from '@app/common/exception/already-loggedin.exception';
import { Role } from '@app/common/variable/role';
import { SessionPolicy } from '../domain/session-policy';
import { SESSION_POLICY } from '../domain/session-policy';
import {
  USER_AUTH_REPOSITORY,
  UserAuthRepository,
} from '../domain/user-auth.repository';
import { InvalidUserLoginException } from '@app/common/exception/invalid-user-login.exception';
import { EVENT_SERVER } from '@app/common/variable/symbols';
import { ClientProxy } from '@nestjs/microservices';
import { EVENT_SERVER_COMMAND } from '@app/common/variable/event-server-command';

@Injectable()
export class LoginUserService {
  constructor(
    @Inject(USER_AUTH_REPOSITORY)
    private readonly userAuthRepository: UserAuthRepository,
    @Inject(SESSION_POLICY)
    private readonly sessionPolicy: SessionPolicy,
    @Inject(EVENT_SERVER)
    private readonly eventClient: ClientProxy,
  ) {}

  async login(body: LoginUserDto, expectedRole: Role): Promise<string> {
    const user = await this.userAuthRepository.findByAccountAndName(
      body.account,
      body.name,
    );

    if (!user) {
      throw new NotFoundUserException(body.name);
    }

    if (expectedRole && user.role !== expectedRole) {
      throw new NotFoundUserException(body.name);
    }

    if (!(await user.password.compare(body.password))) {
      throw new InvalidPasswordException(body.name);
    }

    if (user.isLoggedIn) {
      throw new AlreadyLoggedInException(user.role, body.name);
    }

    if (user.role === Role.USER && user.isBanned) {
      throw new InvalidUserLoginException(user.id);
    }

    const token = await this.sessionPolicy.issueToken(user);
    user.login();
    await this.userAuthRepository.update(user);
    this.eventClient.emit(
      { cmd: EVENT_SERVER_COMMAND.AFTER_USER_LOGIN },
      user.id,
    );
    return token;
  }
}
