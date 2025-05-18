import { Inject, Injectable } from '@nestjs/common';
import { Password } from '../../domain/password';
import { DuplicateUserException } from '@app/common/exception/duplicate-user-exception';
import { Role } from '@app/common/variable/role';
import { CreateUserDto } from '@app/common/dto/create-user-dto';
import { AUDITOR_AUTH_REPOSITORY } from '../../domain/auditor-auth/auditor-auth.repository';
import { AuditorAuthRepository } from '../../domain/auditor-auth/auditor-auth.repository';
import { Auditor } from '../../domain/auditor-auth/auditor';
import { LoginUserDto } from '@app/common/dto/login-user-dto';
import { NotFoundUserException } from '@app/common/exception/not-found-user-exception';
import { InvalidPasswordException } from '@app/common/exception/invalid-password-exception';
import { AlreadyLoggedInException } from '@app/common/exception/already-loggedin-exception';
import { SessionPolicy } from '../../domain/session-policy';
import { SESSION_POLICY } from '../../domain/session-policy';

@Injectable()
export class AuditorAuthService {
  constructor(
    @Inject(AUDITOR_AUTH_REPOSITORY)
    private readonly auditorAuthRepository: AuditorAuthRepository,
    @Inject(SESSION_POLICY)
    private readonly sessionPolicy: SessionPolicy,
  ) {}

  async createAuditor(body: CreateUserDto): Promise<string> {
    const existingAuditor = await this.auditorAuthRepository.findByName(
      body.name,
    );
    if (existingAuditor) {
      throw new DuplicateUserException(body.name);
    }
    const password = await Password.create(body.password);
    const auditor = Auditor.create({
      account: body.account,
      password,
      name: body.name,
      role: Role.AUDITOR,
      baseServer: body.baseServer,
      createdAt: new Date(),
      updatedAt: new Date(),
      isLoggedIn: false,
    });
    await this.auditorAuthRepository.insert(auditor);
    return auditor.id;
  }

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
