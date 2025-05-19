import { HttpStatus } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { EventRewardClaimHistoryReason } from '../variable/event-type';

export class NotFoundEventException extends RpcException {
  constructor(id: string, key?: EventRewardClaimHistoryReason) {
    super({
      message: `Event not found with id: ${id}`,
      key,
      statusCode: HttpStatus.NOT_FOUND,
    });
  }
}
