import { Inject, Injectable } from '@nestjs/common';
import { Password } from '../domain/password';
import { DuplicateUserException } from '@app/common/exception/duplicate-user-exception';
import { Role } from '@app/common/variable/role';
import { CreateUserDto } from '@app/common/dto/create-user-dto';
import { AUDITOR_AUTH_REPOSITORY } from '../domain/auditor-auth.repository';
import { AuditorAuthRepository } from '../domain/auditor-auth.repository';
import { Auditor } from '../domain/auditor';

@Injectable()
export class AuditorAuthService {
  constructor(
    @Inject(AUDITOR_AUTH_REPOSITORY)
    private readonly auditorAuthRepository: AuditorAuthRepository,
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
}
