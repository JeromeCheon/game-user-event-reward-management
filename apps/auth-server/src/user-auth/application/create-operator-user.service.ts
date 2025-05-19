import { Inject, Injectable } from '@nestjs/common';
import { Password } from '../domain/password';
import { DuplicateUserException } from '@app/common/exception/duplicate-user.exception';
import { CreateOperatorDto } from '@app/common/dto/create-operator-dto';
import { User } from '../domain/user';
import {
  USER_AUTH_REPOSITORY,
  UserAuthRepository,
} from '../domain/user-auth.repository';

@Injectable()
export class CreateOperatorUserService {
  constructor(
    @Inject(USER_AUTH_REPOSITORY)
    private readonly userAuthRepository: UserAuthRepository,
  ) {}

  async execute(body: CreateOperatorDto): Promise<string> {
    const existingUser = await this.userAuthRepository.findByName(body.name);
    if (existingUser) {
      throw new DuplicateUserException(body.name);
    }
    const password = await Password.create(body.password);
    const user = User.createOperator({
      account: body.account,
      password,
      name: body.name,
      baseServer: body.baseServer,
      level: 999,
      job: {
        type: body.jobType,
        title: body.jobTitle,
        degree: body.degree,
      },
      createdAt: new Date(),
      updatedAt: new Date(),
      isLoggedIn: false,
    });
    await this.userAuthRepository.insert(user);
    return user.id;
  }
}
