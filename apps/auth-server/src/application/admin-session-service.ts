import { Inject, Injectable } from '@nestjs/common';
import { LoginUserDto } from '@app/common/dto/login-user-dto';
import { NotFoundUserException } from '@app/common/exception/not-found-user-exception';
import { SessionPolicy } from '../domain/session-policy';
import { SESSION_POLICY } from '../domain/session-policy';
import { AlreadyLoggedInException } from '@app/common/exception/already-loggedin-exception';
import { InvalidPasswordException } from '@app/common/exception/invalid-password-exception';
import { ADMIN_AUTH_REPOSITORY } from '../domain/admin-auth.repository';
import { AdminAuthRepository } from '../domain/admin-auth.repository';

@Injectable()
export class AdminSessionService {
  constructor(
    @Inject(ADMIN_AUTH_REPOSITORY)
    private readonly adminAuthRepository: AdminAuthRepository,
    @Inject(SESSION_POLICY)
    private readonly sessionPolicy: SessionPolicy,
  ) {}

  async loginAdmin(body: LoginUserDto): Promise<string> {
    const admin = await this.adminAuthRepository.findByAccountAndName(
      body.account,
      body.name,
    );

    if (!admin) {
      throw new NotFoundUserException(body.name);
    }
    if (!(await admin.password.compare(body.password))) {
      throw new InvalidPasswordException(body.name);
    }
    if (admin.isLoggedIn) {
      throw new AlreadyLoggedInException(admin.role, body.name);
    }

    const token = await this.sessionPolicy.issueToken(admin);
    admin.login();
    await this.adminAuthRepository.update(admin);
    return token;
  }
}
