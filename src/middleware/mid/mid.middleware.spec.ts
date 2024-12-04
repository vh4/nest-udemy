import { MidService } from 'src/helpers/mid/mid.service';
import { MidMiddleware } from './mid.middleware';

describe('MidMiddleware', () => {
  it('should be defined', () => {
    const mid = new MidService();
    expect(new MidMiddleware(mid)).toBeDefined();
  });
});
