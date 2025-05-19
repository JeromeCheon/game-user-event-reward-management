import { ApiProperty } from '@nestjs/swagger';
import { RewardType } from 'apps/event-server/src/domain/reward/reward-type';
import { Reward } from 'apps/event-server/src/domain/reward/reward';
import { RewardItemInfoViewModel } from './reward-item-info.viewmodel';

export class RewardViewModel {
  @ApiProperty({
    description: '보상 ID',
    example: '6499a8e60c75926a00f6b7c1',
  })
  id: string;

  @ApiProperty({
    description: '이벤트 ID',
    example: '6499a8e60c75926a00f6b7c2',
  })
  eventId: string;

  @ApiProperty({
    description: '보상 유형',
    enum: RewardType,
    example: RewardType.CONSUMABLE,
  })
  type: RewardType;

  @ApiProperty({
    description: '보상 아이템 목록',
    type: [RewardItemInfoViewModel],
  })
  items: RewardItemInfoViewModel[];

  @ApiProperty({
    description: '생성 일시',
    example: '2025-05-01T00:00:00.000Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: '수정 일시',
    example: '2025-05-20T00:00:00.000Z',
  })
  updatedAt: Date;

  static fromDomain(reward: Reward): RewardViewModel {
    const viewModel = new RewardViewModel();
    viewModel.id = reward.id;
    viewModel.eventId = reward.eventId;
    viewModel.type = reward.type;
    viewModel.items = reward.items.map((item) => {
      const itemViewModel = new RewardItemInfoViewModel();
      itemViewModel.type = item.type;
      itemViewModel.description = item.description;
      itemViewModel.quantity = item.quantity;
      return itemViewModel;
    });
    viewModel.createdAt = reward.createdAt;
    viewModel.updatedAt = reward.updatedAt;
    return viewModel;
  }
}
