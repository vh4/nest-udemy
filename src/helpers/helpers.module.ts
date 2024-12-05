import { Global, Module } from '@nestjs/common';
import { MessageService } from './message/message.service';
import { ErrorFormatService } from './error-format/error-format.service';
import { MidService } from './mid/mid.service';

@Global()
@Module({
  providers: [MessageService, ErrorFormatService, MidService],
  exports: [MessageService, ErrorFormatService, MidService],
})
export class HelpersModule {}
