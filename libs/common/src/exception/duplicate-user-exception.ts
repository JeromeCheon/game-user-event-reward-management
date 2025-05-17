import { HttpStatus } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

export class DuplicateUserException extends RpcException {
  constructor(name: string) {
    super({
      message: `User already exists with name: ${name}`,
      name,
      statusCode: HttpStatus.CONFLICT,
    });
  }
}
