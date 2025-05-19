import { HttpStatus } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { EventRewardClaimHistoryReason } from '../variable/event-type';

export class DuplicateRewardClaimException extends RpcException {
  constructor(
    eventId: string,
    userId: string,
    key?: EventRewardClaimHistoryReason,
  ) {
    super({
      message: `Duplicate reward claim with event id: ${eventId} and user id: ${userId}`,
      key,
      statusCode: HttpStatus.CONFLICT,
    });
  }
}
