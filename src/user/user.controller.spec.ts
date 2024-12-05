import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { MessageService } from 'src/helpers/message/message.service';
import { ErrorFormatService } from 'src/helpers/error-format/error-format.service';
import { UsersRepository } from './user.respository';
import { UserService } from './user.service';
import { DataSource } from 'typeorm';

describe('UserController', () => {
  let controller: UserController;

  const mockDataSource = {
    createEntityManager: jest.fn().mockReturnValue({
      save: jest.fn(),
      create: jest.fn(),
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        UserService,
        ErrorFormatService,
        MessageService,
        UsersRepository,
        {
          provide: DataSource,
          useValue: mockDataSource,
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
