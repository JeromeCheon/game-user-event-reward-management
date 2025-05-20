import { Inject, Injectable } from '@nestjs/common';
import { Password } from '../domain/password';
import { DuplicateUserException } from '@app/common/exception/duplicate-user.exception';
import { MapleJobTitle } from '@app/common/variable/maple-job-info';
import { MapleJobType } from '@app/common/variable/maple-job-info';
import { User } from '../domain/user';
import {
  USER_AUTH_REPOSITORY,
  UserAuthRepository,
} from '../domain/user-auth.repository';
import { CreateGameUserDto } from '@app/common/dto/create-game-user-dto';
import { EVENT_SERVER } from '@app/common/variable/symbols';
import { ClientProxy } from '@nestjs/microservices';
import { EVENT_SERVER_COMMAND } from '@app/common/variable/event-server-command';

@Injectable()
export class CreateGameUserService {
  constructor(
    @Inject(USER_AUTH_REPOSITORY)
    private readonly userAuthRepository: UserAuthRepository,
    @Inject(EVENT_SERVER)
    private readonly eventClient: ClientProxy,
  ) {}

  async execute(body: CreateGameUserDto): Promise<string> {
    const existingUser = await this.userAuthRepository.findByName(body.name);
    if (existingUser) {
      throw new DuplicateUserException(body.name);
    }
    const password = await Password.create(body.password);
    const user = User.createGameUser({
      account: body.account,
      password,
      name: body.name,
      baseServer: body.baseServer,
      level: 1,
      job: {
        type: MapleJobType.BEGINNER,
        title: MapleJobTitle.BEGINNER,
        degree: 0,
      },
      createdAt: new Date(),
      updatedAt: new Date(),
      isLoggedIn: false,
      isBanned: false,
    });
    await this.userAuthRepository.insert(user);
    this.eventClient.emit(
      { cmd: EVENT_SERVER_COMMAND.AFTER_USER_CREATED },
      { userId: user.id, recommandorName: body.recommandorName },
    );
    return user.id;
  }
}
