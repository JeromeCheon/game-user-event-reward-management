import { HttpStatus } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

export class InvalidEventRewardException extends RpcException {
  constructor(eventId: string) {
    super({
      message: `Invalid event reward with eventId: ${eventId}`,
      statusCode: HttpStatus.BAD_REQUEST,
    });
  }
}
