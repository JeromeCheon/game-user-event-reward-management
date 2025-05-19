import { HttpStatus } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { EventRewardClaimHistoryReason } from '../variable/event-type';
export class InvalidUserEventProgressException extends RpcException {
  constructor(
    eventId: string,
    userId: string,
    key?: EventRewardClaimHistoryReason,
  ) {
    super({
      message: `Invalid user event progress with event id: ${eventId} and user id: ${userId}`,
      key,
      statusCode: HttpStatus.BAD_REQUEST,
    });
  }
}
