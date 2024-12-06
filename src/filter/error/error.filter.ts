import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  ForbiddenException,
  HttpStatus,
  Inject,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { ErrorFormatService, MainError } from 'src/helpers/error-format/error-format.service';
import { MessageService } from 'src/helpers/message/message.service';
import { Logger } from 'winston';

@Catch()
export class ErrorFilter<T> implements ExceptionFilter {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private logger: Logger,
    private readonly format: MessageService,
  ) {}
  catch(exception: any, host: ArgumentsHost) {
    const http = host.switchToHttp();
    const req = http.getRequest<Request>();
    const res = http.getResponse<Response>();

    let StatusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    let message: object;

    if (exception instanceof MainError) {
      StatusCode = HttpStatus.BAD_REQUEST;
      message = {
        responseCode:exception.messageCode,
        responseMessage:exception.messageName
      };
    } else if (exception instanceof TypeError) {
      StatusCode = HttpStatus.BAD_REQUEST;
      message = this.format.FormatError();
    } else if (exception instanceof ForbiddenException) {
      StatusCode = HttpStatus.FORBIDDEN;
      message = this.format.TransactionNotPermittedToTerminal();
    } else if (exception instanceof BadRequestException) {
      StatusCode = HttpStatus.BAD_REQUEST;
      message = this.format.FormatError();
    } else {
      StatusCode = HttpStatus.INTERNAL_SERVER_ERROR;
      message = this.format.SystemMalfunction();
    }

    this.logger.error(
      `request   / ${req.mid} -> header -> ${JSON.stringify(req.headers)} body -> ${JSON.stringify(req.body)}`,
    );
    this.logger.error(`error     / ${req.mid} -> ${exception.message}`);
    this.logger.error(
      `response  / ${req.mid} -> ${JSON.stringify(req.response ?? '-')}`,
    );

    res.status(StatusCode).json({
      ...message,
      ...req.body,
      timestamp: req.timestamp,
    });
  }
}
