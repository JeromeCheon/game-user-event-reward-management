import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  Length,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: '계정' })
  account: string;

  @IsString()
  @IsNotEmpty()
  @Length(6, 12)
  @ApiProperty({ description: '비밀번호' })
  // TODO: 비밀번호 정규식 추가
  password: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(6)
  @MinLength(2)
  @ApiProperty({ description: '이름' })
  // TODO: 이름 정규식 추가
  name: string;
}
