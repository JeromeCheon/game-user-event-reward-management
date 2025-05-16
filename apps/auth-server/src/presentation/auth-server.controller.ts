import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AUTH_SERVER_COMMAND } from '@app/common/auth-server-command';
import { CreateUserDto } from '@app/common/dto/create-user-dto';
import { AuthServerService } from '../application/auth-server.service';

@Controller()
export class AuthServerController {
  constructor(private readonly authServerService: AuthServerService) {}

  @MessagePattern({ cmd: AUTH_SERVER_COMMAND.CREATE_USER })
  createUser(@Payload() body: CreateUserDto): Promise<string> {
    return this.authServerService.createUser(body);
  }
}
