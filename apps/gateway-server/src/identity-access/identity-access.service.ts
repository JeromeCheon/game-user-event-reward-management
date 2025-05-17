import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { AUTH_SERVER } from '@app/common/symbols';
import { firstValueFrom } from 'rxjs';
import { AUTH_SERVER_COMMAND } from '@app/common/auth-server-command';
import { CreateGameUserDto } from '@app/common/dto/create-game-user-dto';
import { CreateUserDto } from '@app/common/dto/create-user-dto';
import { CreateOperatorDto } from '@app/common/dto/create-operator-dto';

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
}
