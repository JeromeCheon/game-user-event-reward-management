import { Inject, Injectable } from '@nestjs/common';
import { LoginUserDto } from '@app/common/dto/login-user-dto';
import { NotFoundUserException } from '@app/common/exception/not-found-user-exception';
import { SessionPolicy } from '../domain/session-policy';
import { SESSION_POLICY } from '../domain/session-policy';
import { AlreadyLoggedInException } from '@app/common/exception/already-loggedin-exception';
import { InvalidPasswordException } from '@app/common/exception/invalid-password-exception';
import { AUDITOR_AUTH_REPOSITORY } from '../domain/auditor-auth.repository';
import { AuditorAuthRepository } from '../domain/auditor-auth.repository';

@Injectable()
export class AuditorSessionService {
  constructor(
    @Inject(AUDITOR_AUTH_REPOSITORY)
    private readonly auditorAuthRepository: AuditorAuthRepository,
    @Inject(SESSION_POLICY)
    private readonly sessionPolicy: SessionPolicy,
  ) {}

  async loginAuditor(body: LoginUserDto): Promise<string> {
    const auditor = await this.auditorAuthRepository.findByAccountAndName(
      body.account,
      body.name,
    );

    if (!auditor) {
      throw new NotFoundUserException(body.account);
    }
    if (!(await auditor.password.compare(body.password))) {
      throw new InvalidPasswordException(body.account);
    }
    if (auditor.isLoggedIn) {
      throw new AlreadyLoggedInException(auditor.role, body.account);
    }

    const token = await this.sessionPolicy.issueToken(auditor);
    auditor.login();
    await this.auditorAuthRepository.update(auditor);
    return token;
  }
}
