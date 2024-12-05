import { Test, TestingModule } from '@nestjs/testing';
import { MidService } from './mid.service';

describe('MidService', () => {
  let service: MidService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MidService],
    }).compile();

    service = module.get<MidService>(MidService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('it should be 19 length', () => {
    const mid = service.MID();
    expect(mid.length).toBeDefined();
    expect(mid.length).toBe(19);
  });
});
