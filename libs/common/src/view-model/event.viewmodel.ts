import { EventCondition } from 'apps/event-server/src/domain/event/event-condition';
import { ApiProperty } from '@nestjs/swagger';
import { EventType } from '@app/common/variable/event-type';
import { EventCreater } from 'apps/event-server/src/domain/event/event-creater';
import { Event } from 'apps/event-server/src/domain/event/event';

export class EventViewModel {
  @ApiProperty({
    description: '이벤트 ID',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id: string;

  @ApiProperty({
    description: '이벤트 이름',
    example: '이벤트 이름',
  })
  name: string;

  @ApiProperty({
    description: '이벤트 설명',
    example: '이벤트 설명',
  })
  description: string;

  @ApiProperty({
    description: '이벤트 타입',
    enum: EventType,
  })
  type: EventType;

  @ApiProperty({
    description: '이벤트 생성일',
    example: '2021-01-01',
  })
  createdAt: Date;

  @ApiProperty({
    description: '이벤트 수정일',
    example: '2021-01-01',
  })
  updatedAt: Date;

  @ApiProperty({
    description: '이벤트 조건',
    example: '이벤트 조건',
    type: 'array',
    items: {
      type: 'object',
      properties: {
        type: { type: 'string' },
        value: { type: 'string' },
        comparisonOp: { type: 'string' },
      },
    },
  })
  conditions: EventCondition[];

  @ApiProperty({
    description: '이벤트 보상',
    example: ['이벤트 보상'],
  })
  rewardIds: string[];

  @ApiProperty({
    description: '이벤트 생성자',
    type: 'object',
    properties: {
      id: { type: 'string' },
      role: { type: 'string' },
    },
  })
  creator?: EventCreater;

  @ApiProperty({
    description: '이벤트 활성화 여부',
    example: true,
  })
  isActive?: boolean;

  @ApiProperty({
    description: '이벤트 시작일',
    example: '2021-01-01',
  })
  startDate: Date;

  @ApiProperty({
    description: '이벤트 종료일',
    example: '2021-01-01',
  })
  endDate: Date;

  static forGameUser(event: Event): EventViewModel {
    const viewModel = new EventViewModel();
    viewModel.id = event.id;
    viewModel.name = event.name;
    viewModel.description = event.description;
    viewModel.type = event.type;
    viewModel.createdAt = event.createdAt;
    viewModel.updatedAt = event.updatedAt;
    viewModel.conditions = event.conditions;
    viewModel.rewardIds = event.rewardIds; // TODO: 추후 실제 보상 목록으로 변경
    viewModel.startDate = event.startDate;
    viewModel.endDate = event.endDate;
    return viewModel;
  }

  static forStaffs(event: Event): EventViewModel {
    const viewModel = new EventViewModel();
    viewModel.id = event.id;
    viewModel.name = event.name;
    viewModel.description = event.description;
    viewModel.type = event.type;
    viewModel.createdAt = event.createdAt;
    viewModel.updatedAt = event.updatedAt;
    viewModel.conditions = event.conditions;
    viewModel.rewardIds = event.rewardIds;
    viewModel.startDate = event.startDate;
    viewModel.endDate = event.endDate;
    viewModel.creator = event.creator;
    viewModel.isActive = event.isActive;
    return viewModel;
  }
}
