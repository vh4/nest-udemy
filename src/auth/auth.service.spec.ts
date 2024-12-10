import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { MessageService } from 'src/helpers/message/message.service';
import { ErrorFormatService } from 'src/helpers/error-format/error-format.service';
import { AuthRepository } from './auth.repository';
import { DataSource } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

describe('AuthService', () => {
  let service: AuthService;

  const mockDataSource = {
    createEntityManager: jest.fn().mockReturnValue({
      authLogin: jest.fn(),
    }),
  };

  const mockAuthRepository = {
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PassportModule.register({ defaultStrategy: 'jwt' })],
      providers: [
        AuthService,
        MessageService,
        ErrorFormatService,
        {
          provide: AuthRepository,
          useValue: mockAuthRepository,
        },JwtService,
        {
          provide: DataSource,
          useValue: mockDataSource,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
