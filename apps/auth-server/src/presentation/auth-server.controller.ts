import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AUTH_SERVER_COMMAND } from '@app/common/auth-server-command';
import { CreateGameUserDto } from '@app/common/dto/create-game-user-dto';
import { UserAuthService } from '../application/user-auth.service';

@Controller()
export class AuthServerController {
  constructor(private readonly authServerService: UserAuthService) {}

  @MessagePattern({ cmd: AUTH_SERVER_COMMAND.CREATE_USER })
  createUser(@Payload() body: CreateGameUserDto): Promise<string> {
    return this.authServerService.createUser(body);
  }
}
