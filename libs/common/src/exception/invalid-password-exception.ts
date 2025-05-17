import { RpcException } from '@nestjs/microservices';
import { HttpStatus } from '@nestjs/common';

export class InvalidPasswordException extends RpcException {
  constructor(name: string) {
    super({
      message: `Invalid password for user: ${name}`,
      name,
      statusCode: HttpStatus.BAD_REQUEST,
    });
  }
}
