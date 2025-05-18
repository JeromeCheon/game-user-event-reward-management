import { Test, TestingModule } from '@nestjs/testing';
import { RoutingRewardService } from './routing-reward.service';

describe('RoutingRewardService', () => {
  let service: RoutingRewardService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RoutingRewardService],
    }).compile();

    service = module.get<RoutingRewardService>(RoutingRewardService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
