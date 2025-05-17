import { HttpStatus } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

export class NotFoundUserException extends RpcException {
  constructor(name: string) {
    super({
      message: `User not found with name: ${name}`,
      name,
      statusCode: HttpStatus.NOT_FOUND,
    });
  }
}
