import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateRewardItemDto {
  @ApiProperty({
    description: '보상 아이템 타입',
    example: 'mystery_secret_box',
  })
  @IsString()
  @IsNotEmpty()
  type: string;
  @ApiProperty({
    description: '보상 아이템 설명',
    example: '신비한 비밀 상자를 열면 랜덤한 아이템을 획득할 수 있습니다.',
  })
  @IsString()
  @IsNotEmpty()
  description: string;
}
