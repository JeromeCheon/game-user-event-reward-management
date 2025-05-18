import { HttpStatus } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

export class NotFoundEventException extends RpcException {
  constructor(id: string) {
    super({
      message: `Event not found with id: ${id}`,
      id,
      statusCode: HttpStatus.NOT_FOUND,
    });
  }
}
