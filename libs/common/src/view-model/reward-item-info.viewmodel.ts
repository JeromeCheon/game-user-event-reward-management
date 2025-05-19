import { ApiProperty } from '@nestjs/swagger';
import { RewardItemInfo } from 'apps/event-server/src/domain/reward/reward-item-info';

export class RewardItemInfoViewModel {
  @ApiProperty({
    description: '아이템 유형',
    example: 'maple_point_coupon',
  })
  type: string;

  @ApiProperty({
    description: '아이템 설명',
    example: '메이플 포인트로 바꿀 수 있는 교환권입니다.',
  })
  description: string;

  @ApiProperty({
    description: '아이템 수량',
    example: 1,
  })
  quantity: number;

  static fromDomain(rewardItemInfo: RewardItemInfo): RewardItemInfoViewModel {
    const viewModel = new RewardItemInfoViewModel();
    viewModel.type = rewardItemInfo.type;
    viewModel.description = rewardItemInfo.description;
    viewModel.quantity = rewardItemInfo.quantity;
    return viewModel;
  }
}
