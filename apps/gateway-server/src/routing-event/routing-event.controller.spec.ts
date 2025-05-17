import { Test, TestingModule } from '@nestjs/testing';
import { RoutingEventController } from './routing-event.controller';
import { RoutingEventService } from './routing-event.service';

describe('RoutingEventController', () => {
  let controller: RoutingEventController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RoutingEventController],
      providers: [RoutingEventService],
    }).compile();

    controller = module.get<RoutingEventController>(RoutingEventController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
