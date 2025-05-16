import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { AUTH_SERVER } from '@app/common/symbols';
import { firstValueFrom } from 'rxjs';
import { AUTH_SERVER_COMMAND } from '@app/common/auth-server-command';
import { CreateUserDto } from '@app/common/dto/create-user-dto';

@Injectable()
export class IdentityAccessService {
  constructor(@Inject(AUTH_SERVER) private readonly authClient: ClientProxy) {}

  async createUser(body: CreateUserDto): Promise<string> {
    return await firstValueFrom(
      this.authClient.send({ cmd: AUTH_SERVER_COMMAND.CREATE_USER }, body),
    );
  }
}
