import { HttpStatus } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

export class NotFoundRewardItemsException extends RpcException {
  constructor(ids: string[]) {
    super({
      message: `보상 아이템을 찾을 수 없습니다. ${ids.join(', ')}`,
      statusCode: HttpStatus.NOT_FOUND,
    });
  }
}
