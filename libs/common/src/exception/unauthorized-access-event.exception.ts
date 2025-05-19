import { HttpStatus } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { EventRewardClaimHistoryReason } from '../variable/event-type';

export class UnauthorizedAccessEventException extends RpcException {
  constructor(
    eventId: string,
    userId: string,
    key?: EventRewardClaimHistoryReason,
  ) {
    super({
      message: `Unauthorized attempt to access event:${eventId} by user:${userId}`,
      key,
      statusCode: HttpStatus.UNAUTHORIZED,
    });
  }
}
