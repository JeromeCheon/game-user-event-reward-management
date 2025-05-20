import { ApiProperty } from '@nestjs/swagger';
import { RewardItem } from '../../../../apps/event-server/src/reward-management/domain/reward-item';

export class RewardItemViewModel {
  @ApiProperty({
    description: '보상 아이템 ID',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id: string;

  @ApiProperty({
    description: '보상 아이템 타입',
    example: 'mystery_secret_box',
  })
  type: string;

  @ApiProperty({
    description: '보상 아이템 설명',
    example: '신비한 비밀 상자를 열면 랜덤한 아이템을 획득할 수 있습니다.',
  })
  description: string;

  @ApiProperty({
    description: '생성일',
    example: '2021-01-01T00:00:00.000Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: '수정일',
    example: '2021-01-01T00:00:00.000Z',
  })
  updatedAt: Date;

  static from(rewardItem: RewardItem): RewardItemViewModel {
    const viewModel = new RewardItemViewModel();
    viewModel.id = rewardItem.id;
    viewModel.type = rewardItem.type;
    viewModel.description = rewardItem.description;
    viewModel.createdAt = rewardItem.createdAt;
    viewModel.updatedAt = rewardItem.updatedAt;
    return viewModel;
  }
}
