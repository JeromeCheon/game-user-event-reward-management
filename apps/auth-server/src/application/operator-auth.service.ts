import { Inject, Injectable } from '@nestjs/common';
import { Password } from '../domain/password';
import { DuplicateUserException } from '@app/common/exception/duplicate-user-exception';
import { Role } from '@app/common/role';
import { OperatorAuthRepository } from '../domain/operator-auth.repository';
import { OPERATOR_AUTH_REPOSITORY } from '../domain/operator-auth.repository';
import { Operator } from '../domain/operator';
import { CreateOperatorDto } from '@app/common/dto/create-operator-dto';

@Injectable()
export class OperatorAuthService {
  constructor(
    @Inject(OPERATOR_AUTH_REPOSITORY)
    private readonly operatorAuthRepository: OperatorAuthRepository,
  ) {}

  async createOperator(body: CreateOperatorDto): Promise<string> {
    const existingOperator = await this.operatorAuthRepository.findByName(
      body.name,
    );
    if (existingOperator) {
      throw new DuplicateUserException(body.name);
    }
    const password = await Password.create(body.password);
    const operator = Operator.create({
      account: body.account,
      password,
      name: body.name,
      role: Role.OPERATOR,
      level: 999,
      baseServer: body.baseServer,
      job: {
        type: body.jobType,
        title: body.jobTitle,
        degree: body.degree,
      },
      createdAt: new Date(),
      updatedAt: new Date(),
      isLoggedIn: false,
    });
    await this.operatorAuthRepository.insert(operator);
    return operator.id;
  }
}
