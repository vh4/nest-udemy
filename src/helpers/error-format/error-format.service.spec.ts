import { Test, TestingModule } from '@nestjs/testing';
import { ErrorFormatService } from './error-format.service';

describe('ErrorFormatService', () => {
  let service: ErrorFormatService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ErrorFormatService],
    }).compile();

    service = module.get<ErrorFormatService>(ErrorFormatService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
