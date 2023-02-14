import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppService', () => {
  let appService: AppService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appService = module.get<AppService>(AppService);
  });

  it('appService should be defined', () => {
    expect(appService).toBeDefined();
  });

  it('should return a welcome message', () => {
    expect(appService.getHello()).toBe(
      'Hi! Welcome to this Tasks Management API, please go to /tasks endpoint',
    );
  });
});
