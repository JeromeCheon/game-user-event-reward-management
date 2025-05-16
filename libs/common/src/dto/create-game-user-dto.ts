import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { CreateUserDto } from './create-user-dto';
import { WorldServerType } from '../world-server-type';

export class CreateGameUserDto extends CreateUserDto {
  @IsEnum(WorldServerType)
  @ApiProperty({ description: '기본 월드 서버' })
  baseServer: WorldServerType;

  @IsString()
  @IsOptional()
  @ApiProperty({ description: '추천인 계정', required: false })
  recommandorAccount?: string;
}
