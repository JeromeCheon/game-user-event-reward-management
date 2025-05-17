import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class EventConditionDto {
  @ApiProperty({ description: '조건 라벨' })
  @IsString()
  @IsNotEmpty()
  label: string;

  @ApiProperty({ description: '조건 값' })
  @IsString()
  @IsNotEmpty()
  value: string;

  @ApiProperty({ description: '조건 타입' })
  @IsString()
  @IsNotEmpty()
  type: string;

  @ApiProperty({ description: '조건 비교 연산자' })
  @IsString()
  @IsNotEmpty()
  comparisonOp: string;
}

export class EventRewardDto {
  @ApiProperty({ description: '보상 타입' })
  @IsString()
  @IsNotEmpty()
  type: string;
}

export class CreateEventDto {
  @ApiProperty({ description: '이벤트 이름' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: '최소 레벨' })
  @IsNumber()
  @IsNotEmpty()
  minLevel: number;

  @ApiProperty({ description: '활성 여부' })
  @IsBoolean()
  @IsNotEmpty()
  isActive: boolean;

  @ApiProperty({ description: '시작 일시' })
  @IsNotEmpty()
  startDate: string;

  @ApiProperty({ description: '종료 일시' })
  @IsNotEmpty()
  endDate: string;

  @ApiProperty({ description: '생성자' })
  @IsString()
  @IsNotEmpty()
  creator: string;

  // @ApiProperty({
  //   description: '이벤트 충족 조건들',
  //   isArray: true,
  //   type: EventConditionDto,
  // })
  // @IsArray()
  // @IsNotEmpty()
  // conditions: EventConditionDto[];

  // @ApiProperty({
  //   description: '충족시 제공 보상들',
  //   isArray: true,
  //   type: EventRewardDto,
  // })
  // @IsArray()
  // @IsNotEmpty()
  // rewards: EventRewardDto[];
}
