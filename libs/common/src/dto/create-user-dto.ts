import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString, Length, Matches } from 'class-validator';
import { WorldServerType } from '../world-server-type';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: '계정' })
  account: string;

  @IsString()
  @IsNotEmpty()
  @Length(8, 20)
  @Matches(/^(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,20}$/, {
    message:
      '비밀번호는 8~20자, 대문자 1개 이상, 특수문자 1개 이상을 포함해야 합니다.',
  })
  @ApiProperty({
    description:
      '비밀번호는 8~20자, 대문자 1개 이상, 특수문자 1개 이상을 포함해야 합니다.',
    example: 'Password123!',
  })
  password: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^[가-힣]{2,6}$|^[가-힣A-Za-z0-9]{2,12}$/, {
    message: '이름은 한글 2~6자 또는 한+영+숫자 2~12자, 특수문자 불가',
  })
  @ApiProperty({ description: '이름', example: '홍길동 또는 JohnDoe' })
  name: string;

  @IsEnum(WorldServerType)
  @ApiProperty({ description: '기본 월드 서버', enum: WorldServerType })
  baseServer: WorldServerType;
}
