import { Controller, Get } from '@nestjs/common';
import { IdentityAccessService } from './identity-access.service';

@Controller('v1/auth')
export class IdentityAccessController {
  constructor(private readonly identityAccessService: IdentityAccessService) {}

  @Get()
  getHello(): Promise<string> {
    return this.identityAccessService.getHello();
  }
}
