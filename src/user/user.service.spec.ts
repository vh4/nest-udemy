import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { ErrorFormatService } from 'src/helpers/error-format/error-format.service';
import { MessageService } from 'src/helpers/message/message.service';
import { UsersRepository } from './user.respository';
import { DataSource } from 'typeorm';

describe('UserService', () => {
  let service: UserService;

  const mockDataSource = {
    createEntityManager: jest.fn().mockReturnValue({
      save: jest.fn(),
      create: jest.fn(),
    }),
  };


  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        UsersRepository,
        ErrorFormatService,
        MessageService,
        {
          provide: DataSource,
          useValue: mockDataSource,
        }
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
