import { Body, Controller, Post, UseFilters } from '@nestjs/common';
import { IdentityAccessService } from './identity-access.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from '@app/common/dto/create-user-dto';
import { CustomHttpExceptionFilter } from '@app/common/exception/custom-http-exception.filter';

@ApiTags('v1/auth')
@Controller('v1/auth')
@UseFilters(CustomHttpExceptionFilter)
export class IdentityAccessController {
  constructor(private readonly identityAccessService: IdentityAccessService) {}

  @Post('user')
  @ApiOperation({ summary: '유저 생성' })
  createUser(@Body() body: CreateUserDto): Promise<string> {
    return this.identityAccessService.createUser(body);
  }
}
