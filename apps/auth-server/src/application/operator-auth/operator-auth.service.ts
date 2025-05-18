import { Inject, Injectable } from '@nestjs/common';
import { Password } from '../../domain/password';
import { DuplicateUserException } from '@app/common/exception/duplicate-user-exception';
import { Role } from '@app/common/variable/role';
import { OperatorAuthRepository } from '../../domain/operator-auth/operator-auth.repository';
import { OPERATOR_AUTH_REPOSITORY } from '../../domain/operator-auth/operator-auth.repository';
import { Operator } from '../../domain/operator-auth/operator';
import { CreateOperatorDto } from '@app/common/dto/create-operator-dto';
import { LoginUserDto } from '@app/common/dto/login-user-dto';
import { NotFoundUserException } from '@app/common/exception/not-found-user-exception';
import { InvalidPasswordException } from '@app/common/exception/invalid-password-exception';
import { AlreadyLoggedInException } from '@app/common/exception/already-loggedin-exception';
import { SessionPolicy } from '../../domain/session-policy';
import { SESSION_POLICY } from '../../domain/session-policy';

@Injectable()
export class OperatorAuthService {
  constructor(
    @Inject(OPERATOR_AUTH_REPOSITORY)
    private readonly operatorAuthRepository: OperatorAuthRepository,
    @Inject(SESSION_POLICY)
    private readonly sessionPolicy: SessionPolicy,
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

  async loginOperator(body: LoginUserDto): Promise<string> {
    const operator = await this.operatorAuthRepository.findByAccountAndName(
      body.account,
      body.name,
    );

    if (!operator) {
      throw new NotFoundUserException(body.account);
    }
    if (!(await operator.password.compare(body.password))) {
      throw new InvalidPasswordException(body.account);
    }
    if (operator.isLoggedIn) {
      throw new AlreadyLoggedInException(operator.role, body.account);
    }

    const token = await this.sessionPolicy.issueToken(operator);
    operator.login();
    await this.operatorAuthRepository.update(operator);
    return token;
  }
}
