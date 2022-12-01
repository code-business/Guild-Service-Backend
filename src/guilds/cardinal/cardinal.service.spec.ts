import { Test, TestingModule } from '@nestjs/testing';
import { CardinalService } from './cardinal.service';

describe('CardinalService', () => {
  let service: CardinalService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CardinalService],
    }).compile();

    service = module.get<CardinalService>(CardinalService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
