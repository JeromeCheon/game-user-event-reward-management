import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthServerService {
  getHello(): string {
    return 'Say Hello from Auth Microservice routed by Gateway Server!';
  }
}
