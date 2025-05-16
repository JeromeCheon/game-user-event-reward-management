import { Controller } from '@nestjs/common';
import { AuthServerService } from './auth-server.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class AuthServerController {
  constructor(private readonly authServerService: AuthServerService) {}

  @MessagePattern({ cmd: 'hello' })
  getHello(): string {
    return this.authServerService.getHello();
  }
}
