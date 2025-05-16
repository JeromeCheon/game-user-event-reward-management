import { Body, Controller, Post, UseFilters } from '@nestjs/common';
import { IdentityAccessService } from './identity-access.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CustomHttpExceptionFilter } from '@app/common/exception/custom-http-exception.filter';
import { CreateGameUserDto } from '@app/common/dto/create-game-user-dto';

@ApiTags('v1/auth')
@Controller('v1/auth')
@UseFilters(CustomHttpExceptionFilter)
export class IdentityAccessController {
  constructor(private readonly identityAccessService: IdentityAccessService) {}

  @Post('user')
  @ApiOperation({ summary: '유저 생성' })
  createUser(@Body() body: CreateGameUserDto): Promise<string> {
    return this.identityAccessService.createUser(body);
  }
}
