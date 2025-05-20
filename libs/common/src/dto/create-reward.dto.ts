import { ApiProperty } from '@nestjs/swagger';
import { RewardType } from 'apps/event-server/src/reward-management/domain/reward-type';
import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsEnum,
  Min,
  IsArray,
  ValidateNested,
} from 'class-validator';

export class RewardItemDto {
  @ApiProperty({
    description: '보상 아이템 ID',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsString()
  @IsNotEmpty()
  rewardItemId: string;

  @ApiProperty({
    description: '보상 아이템 수량',
    example: 1,
  })
  @IsNumber()
  @Min(1)
  @IsNotEmpty()
  quantity: number;
}

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
    description: '보상 아이템 리스트',
    example: [
      {
        rewardItemId: '123e4567-e89b-12d3-a456-426614174000',
        quantity: 1,
      },
    ],
  })
  @ValidateNested({ each: true })
  @IsArray()
  @IsNotEmpty()
  items: RewardItemDto[];
}
