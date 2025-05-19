import { HttpStatus } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

export class InvalidUserLoginException extends RpcException {
  constructor(userId: string) {
    super({
      message: `Invalid user login with userId: ${userId} due to banned`,
      statusCode: HttpStatus.BAD_REQUEST,
    });
  }
}
