import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MessageService } from 'src/helpers/message/message.service';
import { ErrorFormatService } from 'src/helpers/error-format/error-format.service';
import { AuthRepository } from './auth.repository';
import { DataSource } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

describe('AuthController', () => {
  let controller: AuthController;
  const mockDataSource = {
    createEntityManager: jest.fn().mockReturnValue({
      authLogin: jest.fn(),
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers:[AuthService, MessageService, ErrorFormatService, AuthRepository, JwtService, {
        provide:DataSource,
        useValue:mockDataSource
      }]
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
