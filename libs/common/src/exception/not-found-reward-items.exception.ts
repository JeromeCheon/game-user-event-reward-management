import { HttpStatus } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

export class NotFoundRewardItemsException extends RpcException {
  constructor(ids: string[]) {
    super({
      message: `Not found reward items with ids: ${ids.join(', ')}`,
      statusCode: HttpStatus.NOT_FOUND,
    });
  }
}
