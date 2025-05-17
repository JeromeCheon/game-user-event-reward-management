import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { CreateUserDto } from './create-user-dto';

export class CreateGameUserDto extends CreateUserDto {
  @IsString()
  @IsOptional()
  @ApiProperty({ description: '추천인 계정', required: false })
  recommandorAccount?: string;
}
