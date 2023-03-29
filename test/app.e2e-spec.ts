import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';

describe('App EndToEnd tests', () => {
  beforeAll(async () => {
    const appModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
  });
  it.todo('should pass');
});
