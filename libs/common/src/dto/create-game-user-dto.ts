import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { CreateUserDto } from './create-user-dto';

export class CreateGameUserDto extends CreateUserDto {
  @IsString()
  @IsOptional()
  @ApiProperty({
    description: '추천인 이름(전 서버 통틀어 유니크',
    required: false,
  })
  recommandorName?: string;
}
