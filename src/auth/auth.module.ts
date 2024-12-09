import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AuthRepository } from './auth.repository';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtStategy } from './jwt.stategy';

@Module({
  imports:[
    TypeOrmModule.forFeature([AuthRepository]),
    PassportModule.register({defaultStrategy:'jwt'}),
    JwtModule.register({
      secret:"secretBoy",
      signOptions:{
        expiresIn:3600
      }
    })
  ],
  providers: [AuthService, AuthRepository, JwtStategy],
  controllers: [AuthController],
  exports:[JwtStategy, PassportModule]
})
export class AuthModule {}
