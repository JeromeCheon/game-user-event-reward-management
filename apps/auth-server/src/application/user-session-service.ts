import { Inject, Injectable } from '@nestjs/common';
import { GameUserAuthRepository } from '../domain/game-user-auth.repository';
import { GAME_USER_AUTH_REPOSITORY } from '../domain/game-user-auth.repository';
import { LoginUserDto } from '@app/common/dto/login-user-dto';
import { NotFoundUserException } from '@app/common/exception/not-found-user-exception';
import { SessionPolicy } from '../domain/session-policy';
import { SESSION_POLICY } from '../domain/session-policy';
import { AlreadyLoggedInException } from '@app/common/exception/already-loggedin-exception';
import { InvalidPasswordException } from '@app/common/exception/invalid-password-exception';

@Injectable()
export class UserSessionService {
  constructor(
    @Inject(GAME_USER_AUTH_REPOSITORY)
    private readonly userAuthRepository: GameUserAuthRepository,
    @Inject(SESSION_POLICY)
    private readonly sessionPolicy: SessionPolicy,
  ) {}

  async loginUser(body: LoginUserDto): Promise<string> {
    const user = await this.userAuthRepository.findByAccountAndName(
      body.account,
      body.name,
    );

    if (!user) {
      throw new NotFoundUserException(body.name);
    }
    if (!(await user.password.compare(body.password))) {
      throw new InvalidPasswordException(body.name);
    }
    if (user.isLoggedIn) {
      throw new AlreadyLoggedInException(user.role, body.name);
    }

    const token = await this.sessionPolicy.issueToken(user);
    user.login();
    await this.userAuthRepository.update(user);
    return token;
  }
}
