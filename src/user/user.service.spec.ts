import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { ErrorFormatService } from 'src/helpers/error-format/error-format.service';
import { MessageService } from 'src/helpers/message/message.service';
import { UsersRepository } from './user.respository';
import { DataSource } from 'typeorm';
import { AuthGuard } from '@nestjs/passport';

jest.mock('@nestjs/passport', () => ({
  AuthGuard: jest.fn(() => ({
    canActivate: jest.fn(() => true), // Allow all requests
  })),
  PassportModule: {
    register: jest.fn(() => ({})), // Mock PassportModule.register
  },
}));

describe('UserService', () => {
  let service: UserService;

  const mockDataSource = {
    createEntityManager: jest.fn().mockReturnValue({
      save: jest.fn(),
      create: jest.fn(),
    }),
  };

  const mockUsersRepository = {
    findOne: jest.fn(),
    save: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [], // Avoid importing the real PassportModule
      providers: [
        UserService,
        ErrorFormatService,
        MessageService,
        {
          provide: UsersRepository,
          useValue: mockUsersRepository,
        },
        {
          provide: DataSource,
          useValue: mockDataSource,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
