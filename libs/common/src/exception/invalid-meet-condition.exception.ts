import { HttpStatus } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { EventRewardClaimHistoryReason } from '../variable/event-type';

export class InvalidMeetConditionException extends RpcException {
  constructor(
    eventId: string,
    userId: string,
    key?: EventRewardClaimHistoryReason,
  ) {
    super({
      message: `Not condition met with event id: ${eventId} and user id: ${userId}`,
      key,
      statusCode: HttpStatus.BAD_REQUEST,
    });
  }
}
