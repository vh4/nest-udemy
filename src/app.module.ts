import { Module, ParseIntPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TaskModule } from './task/task.module';
import { ConfigModule } from '@nestjs/config';
import { WinstonModule } from 'nest-winston';
import { HelpersModule } from './helpers/helpers.module';
import * as winston from 'winston';
import moment from 'moment';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { User } from './user/user.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true,
    }),
    WinstonModule.forRoot({
      transports:[
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.colorize(),
            winston.format.printf(({level, message}) => {
              return `[Nest] ${process.pid}  - ${moment().format('DD/MM/YYYY HH:mm:ss.SSS')}    ${level} => ${message}`;
            })
          )
        })
      ]
    }),
    TypeOrmModule.forRoot({
      type: process.env.DRIVER as any,
      host: process.env.HOST,
      port: parseInt(process.env.PORT, 10),
      username: process.env.USERNAME,
      password: process.env.PASSWORD,
      database: process.env.DATABASE,
      autoLoadEntities: true,
      synchronize: true,
      entities:[User]
    }),
    
    TaskModule,
    HelpersModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
