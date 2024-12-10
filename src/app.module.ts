import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
  ValidationPipe,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TaskModule } from './task/task.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { WinstonModule } from 'nest-winston';
import { HelpersModule } from './helpers/helpers.module';
import * as winston from 'winston';
import * as moment from 'moment';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { User } from './user/user.entity';
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { ErrorFilter } from './filter/error/error.filter';
import { TimeInterceptor } from './interceptor/time/time.interceptor';
import { MidMiddleware } from './middleware/mid/mid.middleware';
import { SuccessInterceptor } from './interceptor/success/success.interceptor';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      // envFilePath:[`.env.stage.${process.env.STAGE}`]
    }),
    WinstonModule.forRoot({
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.colorize(),
            winston.format.printf(({ level, message }) => {
              return `[Nest] ${process.pid}  - ${moment().format('DD/MM/YYYY HH:mm:ss.SSS')}    ${level} => ${message}`;
            }),
          ),
        }),
      ],
    }),
    TypeOrmModule.forRootAsync({
      imports:[ConfigModule],
      inject:[ConfigService],
      useFactory: async (configService:ConfigService) => {
        return {          
          type: configService.get('DRIVER') as any,
          host: configService.get('HOST'),
          port: parseInt(process.env.PORT, 10),
          username: configService.get('USERNAME'),
          password: process.env.PASSWORD,
          database: process.env.DATABASE,
          autoLoadEntities: true,
          synchronize: true,
          entities: [User],
        }
      }
    }),

    TaskModule,
    HelpersModule,
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: TimeInterceptor,
    },
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: SuccessInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: ErrorFilter,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(MidMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}
