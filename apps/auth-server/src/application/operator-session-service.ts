import { Inject, Injectable } from '@nestjs/common';
import { LoginUserDto } from '@app/common/dto/login-user-dto';
import { NotFoundUserException } from '@app/common/exception/not-found-user-exception';
import { SessionPolicy } from '../domain/session-policy';
import { SESSION_POLICY } from '../domain/session-policy';
import { AlreadyLoggedInException } from '@app/common/exception/already-loggedin-exception';
import { InvalidPasswordException } from '@app/common/exception/invalid-password-exception';
import { OPERATOR_AUTH_REPOSITORY } from '../domain/operator-auth.repository';
import { OperatorAuthRepository } from '../domain/operator-auth.repository';

@Injectable()
export class OperatorSessionService {
  constructor(
    @Inject(OPERATOR_AUTH_REPOSITORY)
    private readonly operatorAuthRepository: OperatorAuthRepository,
    @Inject(SESSION_POLICY)
    private readonly sessionPolicy: SessionPolicy,
  ) {}

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
