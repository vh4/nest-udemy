import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersRepository } from './user.respository';
import { AuthModule } from 'src/auth/auth.module';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [TypeOrmModule.forFeature([UsersRepository]), AuthModule, PassportModule.register({defaultStrategy:'jwt'})],
  providers: [UserService, UsersRepository],
  controllers: [UserController],
})
export class UserModule {}
