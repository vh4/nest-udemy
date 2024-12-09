import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { MessageService } from 'src/helpers/message/message.service';
import { ErrorFormatService } from 'src/helpers/error-format/error-format.service';
import { AuthRepository } from './auth.repository';
import { DataSource } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

describe('AuthService', () => {
  let service: AuthService;
  const mockDataSource = {
    createEntityManager: jest.fn().mockReturnValue({
      authLogin: jest.fn(),
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, MessageService, ErrorFormatService, AuthRepository, JwtService,
        {
          provide: DataSource,
          useValue: mockDataSource,
        }],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
