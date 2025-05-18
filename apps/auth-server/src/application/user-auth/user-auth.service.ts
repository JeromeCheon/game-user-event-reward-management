import { Inject, Injectable } from '@nestjs/common';
import {
  GAME_USER_AUTH_REPOSITORY,
  GameUserAuthRepository,
} from '../../domain/user-auth/game-user-auth.repository';
import { Password } from '../../domain/password';
import { DuplicateUserException } from '@app/common/exception/duplicate-user-exception';
import { Role } from '@app/common/variable/role';
import { CreateGameUserDto } from '@app/common/dto/create-game-user-dto';
import { GameUser } from '../../domain/user-auth/game-user';
import { MapleJobTitle } from '@app/common/variable/maple-job-info';
import { MapleJobType } from '@app/common/variable/maple-job-info';
import { LoginUserDto } from '@app/common/dto/login-user-dto';
import { NotFoundUserException } from '@app/common/exception/not-found-user-exception';
import { InvalidPasswordException } from '@app/common/exception/invalid-password-exception';
import { AlreadyLoggedInException } from '@app/common/exception/already-loggedin-exception';
import { SessionPolicy } from '../../domain/session-policy';
import { SESSION_POLICY } from '../../domain/session-policy';

@Injectable()
export class UserAuthService {
  constructor(
    @Inject(GAME_USER_AUTH_REPOSITORY)
    private readonly userAuthRepository: GameUserAuthRepository,
    @Inject(SESSION_POLICY)
    private readonly sessionPolicy: SessionPolicy,
  ) {}

  async createUser(body: CreateGameUserDto): Promise<string> {
    const existingUser = await this.userAuthRepository.findByName(body.name);
    if (existingUser) {
      throw new DuplicateUserException(body.name);
    }
    const password = await Password.create(body.password);
    const user = GameUser.create({
      account: body.account,
      password,
      name: body.name,
      role: Role.USER,
      level: 1,
      baseServer: body.baseServer,
      job: {
        type: MapleJobType.BEGINNER,
        title: MapleJobTitle.BEGINNER,
        degree: 0,
      },
      recommandorAccount: body.recommandorAccount ?? undefined,
      createdAt: new Date(),
      updatedAt: new Date(),
      isLoggedIn: false,
      isBanned: false,
    });
    await this.userAuthRepository.insert(user);
    return user.id;
  }

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
