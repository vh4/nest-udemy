import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request } from 'express';
import { MidService } from 'src/helpers/mid/mid.service';

@Injectable()
export class MidMiddleware implements NestMiddleware {
  constructor(private readonly mid: MidService) {}
  use(req: Request, res: any, next: () => void) {
    req.mid = this.mid.MID();
    next();
  }
}
