import { Inject, Injectable } from '@nestjs/common';
import {
  GAME_USER_AUTH_REPOSITORY,
  GameUserAuthRepository,
} from '../domain/game-user-auth.repository';
import { Password } from '../domain/password';
import { DuplicateUserException } from '@app/common/exception/duplicate-user-exception';
import { Role } from '@app/common/variable/role';
import { CreateGameUserDto } from '@app/common/dto/create-game-user-dto';
import { GameUser } from '../domain/game-user';
import { MapleJobTitle } from '@app/common/variable/maple-job-info';
import { MapleJobType } from '@app/common/variable/maple-job-info';

@Injectable()
export class UserAuthService {
  constructor(
    @Inject(GAME_USER_AUTH_REPOSITORY)
    private readonly userAuthRepository: GameUserAuthRepository,
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
}
