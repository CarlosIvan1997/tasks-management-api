import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hi! Welcome to this Tasks Management API, please go to /tasks endpoint';
  }
}
