import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  getHelloApi() {
    return {
      message: 'Hello from NestJS Hello API',
      framework: 'NestJS',
      module: 'AppModule',
      controller: 'AppController',
      service: 'AppService',
      status: 'success',
    };
  }
} 