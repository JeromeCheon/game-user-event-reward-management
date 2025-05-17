import { Inject, Injectable } from '@nestjs/common';
import { Password } from '../domain/password';
import { DuplicateUserException } from '@app/common/exception/duplicate-user-exception';
import { Role } from '@app/common/role';
import { CreateUserDto } from '@app/common/dto/create-user-dto';
import { ADMIN_AUTH_REPOSITORY } from '../domain/admin-auth.repository';
import { AdminAuthRepository } from '../domain/admin-auth.repository';
import { Admin } from '../domain/admin';

@Injectable()
export class AdminAuthService {
  constructor(
    @Inject(ADMIN_AUTH_REPOSITORY)
    private readonly adminAuthRepository: AdminAuthRepository,
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
}
