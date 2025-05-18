import { ApiProperty } from '@nestjs/swagger';
import { RewardType } from 'apps/event-server/src/domain/reward/reward-type';
import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsEnum,
  IsArray,
  Min,
} from 'class-validator';

export class CreateRewardDto {
  @ApiProperty({
    description: '연결할 이벤트 ID',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsString()
  @IsNotEmpty()
  eventId: string;

  @ApiProperty({
    description: '보상 타입',
    example: 'equipment | consumable | cash',
  })
  @IsEnum(RewardType)
  @IsNotEmpty()
  type: RewardType;

  @ApiProperty({
    description: '보상 아이템 ID (복수개 설정 가능)',
    example: ['123e4567-e89b-12d3-a456-426614174000'],
    isArray: true,
  })
  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty()
  rewardItemIds: string[];

  @ApiProperty({
    description: '보상 수량',
    example: 1,
  })
  @IsNumber()
  @Min(1)
  @IsNotEmpty()
  quantity: number;
}
