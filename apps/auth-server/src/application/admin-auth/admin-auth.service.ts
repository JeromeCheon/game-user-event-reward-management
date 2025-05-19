import { Inject, Injectable } from '@nestjs/common';
import { Password } from '../../domain/password';
import { DuplicateUserException } from '@app/common/exception/duplicate-user.exception';
import { Role } from '@app/common/variable/role';
import { CreateUserDto } from '@app/common/dto/create-user-dto';
import { ADMIN_AUTH_REPOSITORY } from '../../domain/admin-auth/admin-auth.repository';
import { AdminAuthRepository } from '../../domain/admin-auth/admin-auth.repository';
import { Admin } from '../../domain/admin-auth/admin';
import { LoginUserDto } from '@app/common/dto/login-user-dto';
import { NotFoundUserException } from '@app/common/exception/not-found-user.exception';
import { InvalidPasswordException } from '@app/common/exception/invalid-password.exception';
import { AlreadyLoggedInException } from '@app/common/exception/already-loggedin.exception';
import { SessionPolicy } from '../../domain/session-policy';
import { SESSION_POLICY } from '../../domain/session-policy';

@Injectable()
export class AdminAuthService {
  constructor(
    @Inject(ADMIN_AUTH_REPOSITORY)
    private readonly adminAuthRepository: AdminAuthRepository,
    @Inject(SESSION_POLICY)
    private readonly sessionPolicy: SessionPolicy,
  ) {}

  async createAdmin(body: CreateUserDto): Promise<string> {
    const existingAdmin = await this.adminAuthRepository.findByName(body.name);
    if (existingAdmin) {
      throw new DuplicateUserException(body.name);
    }
    const password = await Password.create(body.password);
    const admin = Admin.create({
      account: body.account,
      password,
      name: body.name,
      role: Role.ADMIN,
      baseServer: body.baseServer,
      createdAt: new Date(),
      updatedAt: new Date(),
      isLoggedIn: false,
    });
    await this.adminAuthRepository.insert(admin);
    return admin.id;
  }

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
