import { CallHandler, ExecutionContext, Inject, Injectable, NestInterceptor } from '@nestjs/common';
import { Request } from 'express';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { Observable, tap } from 'rxjs';
import { Logger } from 'winston';

@Injectable()
export class SuccessInterceptor implements NestInterceptor {
  constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER) private logger: Logger
  ){}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest<Request>();
    const mid = request.mid;
    return next.handle().pipe(
      tap(() => {
        this.logger.warn(
          `success / ${mid} / request  -> ${JSON.stringify(request.body)}`,
        );
        this.logger.warn(
          `success / ${mid} / response -> ${JSON.stringify(request.response) ?? '-'}`,
        );
      })
    )
  }
}
