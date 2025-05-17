import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber } from 'class-validator';
import { CreateUserDto } from './create-user-dto';
import { MapleJobTitle, MapleJobType } from '../variable/maple-job-info';

export class CreateOperatorDto extends CreateUserDto {
  @IsEnum(MapleJobTitle)
  @ApiProperty({ description: '전직', enum: MapleJobTitle })
  jobTitle: MapleJobTitle;

  @IsEnum(MapleJobType)
  @ApiProperty({ description: '직업', enum: MapleJobType })
  jobType: MapleJobType;

  @IsNumber()
  @ApiProperty({ description: '전직 차수', enum: [0, 1, 2, 3, 4, 5] })
  degree: 0 | 1 | 2 | 3 | 4 | 5;
}
