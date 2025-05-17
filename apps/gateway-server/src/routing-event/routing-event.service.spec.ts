import { Test, TestingModule } from '@nestjs/testing';
import { RoutingEventService } from './routing-event.service';

describe('RoutingEventService', () => {
  let service: RoutingEventService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RoutingEventService],
    }).compile();

    service = module.get<RoutingEventService>(RoutingEventService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
