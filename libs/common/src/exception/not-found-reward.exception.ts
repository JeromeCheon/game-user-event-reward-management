import { HttpStatus } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

export class NotFoundRewardException extends RpcException {
  constructor(id: string) {
    super({
      message: `Not found reward with id: ${id}`,
      statusCode: HttpStatus.NOT_FOUND,
    });
  }
}
