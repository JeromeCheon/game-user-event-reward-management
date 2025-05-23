import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { AUTH_SERVER } from '@app/common/variable/symbols';
import { firstValueFrom } from 'rxjs';
import { AUTH_SERVER_COMMAND } from '@app/common/variable/auth-server-command';
import { CreateUserDto } from '@app/common/dto/create-user-dto';
import { CreateOperatorDto } from '@app/common/dto/create-operator-dto';
import { LoginUserDto } from '@app/common/dto/login-user-dto';
import { CreateGameUserDto } from '@app/common/dto/create-game-user-dto';

@Injectable()
export class IdentityAccessService {
  constructor(@Inject(AUTH_SERVER) private readonly authClient: ClientProxy) {}

  async createUser(body: CreateGameUserDto): Promise<string> {
    return await firstValueFrom(
      this.authClient.send({ cmd: AUTH_SERVER_COMMAND.CREATE_USER }, body),
    );
  }

  async createAdmin(body: CreateUserDto): Promise<string> {
    return await firstValueFrom(
      this.authClient.send({ cmd: AUTH_SERVER_COMMAND.CREATE_ADMIN }, body),
    );
  }

  async createAuditor(body: CreateUserDto): Promise<string> {
    return await firstValueFrom(
      this.authClient.send({ cmd: AUTH_SERVER_COMMAND.CREATE_AUDITOR }, body),
    );
  }

  async createOperator(body: CreateOperatorDto): Promise<string> {
    return await firstValueFrom(
      this.authClient.send({ cmd: AUTH_SERVER_COMMAND.CREATE_OPERATOR }, body),
    );
  }

  async loginUser(body: LoginUserDto): Promise<string> {
    return await firstValueFrom(
      this.authClient.send({ cmd: AUTH_SERVER_COMMAND.LOGIN_USER }, body),
    );
  }

  async loginAdmin(body: LoginUserDto): Promise<string> {
    return await firstValueFrom(
      this.authClient.send({ cmd: AUTH_SERVER_COMMAND.LOGIN_ADMIN }, body),
    );
  }

  async loginOperator(body: LoginUserDto): Promise<string> {
    return await firstValueFrom(
      this.authClient.send({ cmd: AUTH_SERVER_COMMAND.LOGIN_OPERATOR }, body),
    );
  }

  async loginAuditor(body: LoginUserDto): Promise<string> {
    return await firstValueFrom(
      this.authClient.send({ cmd: AUTH_SERVER_COMMAND.LOGIN_AUDITOR }, body),
    );
  }
}
