import { Injectable } from '@nestjs/common';

@Injectable()
export class MidService {
  MID(): string {
    const first = Date.now();
    const second = Math.floor((first % 1000) * 10)
      .toString()
      .padStart(2, '0');
    const thirth = Math.floor(Math.random() * 1000)
      .toString()
      .padStart(3, '0');
    return `${first}${second}${thirth}`.slice(0, 19);
  }
}
