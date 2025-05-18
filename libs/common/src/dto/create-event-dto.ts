import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';
import {
  EventComparisonOp,
  EventConditionType,
  EventType,
} from '../variable/event-type';

export class EventConditionDto {
  @ApiProperty({ description: '조건 타입', example: 'recommend_count' })
  @IsEnum(EventConditionType)
  @IsNotEmpty()
  type: EventConditionType;

  @ApiProperty({ description: '조건 값', example: 1 })
  @IsString()
  @IsNotEmpty()
  value: string;

  @ApiProperty({ description: '조건 비교 연산자', example: 'gte' })
  @IsEnum(EventComparisonOp)
  @IsNotEmpty()
  comparisonOp: EventComparisonOp;
}

export class CreateEventDto {
  @ApiProperty({ description: '이벤트 이름', example: '추천인n명 이벤트' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: '이벤트 설명', example: '추천인 1명 이상..' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ description: '이벤트 타입', example: 'recommend_friend' })
  @IsEnum(EventType)
  @IsNotEmpty()
  type: EventType;

  @ApiProperty({ description: '참여 최소 레벨', example: 1 })
  @IsNumber()
  @Min(1)
  @IsNotEmpty()
  minLevel: number;

  @ApiProperty({
    description: '시작 일시',
    example: '2025-05-01T00:00:00.000Z',
  })
  @IsDateString()
  @IsNotEmpty()
  startDate: Date;

  @ApiProperty({
    description: '종료 일시',
    example: '2025-06-01T00:00:00.000Z',
  })
  @IsDateString()
  @IsNotEmpty()
  endDate: Date;

  @ApiProperty({
    description: '이벤트 충족 조건들',
    isArray: true,
    type: EventConditionDto,
  })
  @IsArray()
  @ValidateNested({ each: true })
  @IsNotEmpty()
  conditions: EventConditionDto[];
}
