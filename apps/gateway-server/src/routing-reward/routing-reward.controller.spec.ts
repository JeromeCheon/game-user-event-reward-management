import { Test, TestingModule } from '@nestjs/testing';
import { RoutingRewardController } from './routing-reward.controller';
import { RoutingRewardService } from './routing-reward.service';

describe('RoutingRewardController', () => {
  let controller: RoutingRewardController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RoutingRewardController],
      providers: [RoutingRewardService],
    }).compile();

    controller = module.get<RoutingRewardController>(RoutingRewardController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
