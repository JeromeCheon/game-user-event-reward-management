import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from '@app/common/dto/create-user-dto';
import {
  AUTH_SERVER_REPOSITORY,
  AuthServerRepository,
} from '../domain/auth-server.repository';
import { User } from '../domain/user';
import { Password } from '../domain/password';
import { DuplicateUserException } from '@app/common/exception/duplicate-user-exception';
import { Role } from '@app/common/role';

@Injectable()
export class AuthServerService {
  constructor(
    @Inject(AUTH_SERVER_REPOSITORY)
    private readonly authServerRepository: AuthServerRepository,
  ) {}

  async createUser(body: CreateUserDto): Promise<string> {
    const existingUser = await this.authServerRepository.findByName(body.name);
    if (existingUser) {
      throw new DuplicateUserException(body.name);
    }
    const password = await Password.create(body.password);
    const user = User.create({
      account: body.account,
      password,
      name: body.name,
      role: Role.USER,
    });
    await this.authServerRepository.insert(user);
    return user.id;
  }
}
