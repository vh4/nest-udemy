import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersRepository } from './user.respository';

@Module({
  imports: [TypeOrmModule.forFeature([UsersRepository])],
  providers: [UserService, UsersRepository],
  controllers: [UserController],
})
export class UserModule {}
