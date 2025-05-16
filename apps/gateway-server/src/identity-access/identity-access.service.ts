import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { AUTH_SERVER } from 'apps/shared/symbols';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class IdentityAccessService {
  constructor(@Inject(AUTH_SERVER) private readonly authClient: ClientProxy) {}

  getHello(): Promise<string> {
    return firstValueFrom(this.authClient.send({ cmd: 'hello' }, {}));
  }
}
