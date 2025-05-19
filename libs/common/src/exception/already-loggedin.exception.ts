import { HttpStatus } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Role } from '../variable/role';

export class AlreadyLoggedInException extends RpcException {
  constructor(role: Role, name: string) {
    super({
      message: `${role} already logged with name: ${name}`,
      statusCode: HttpStatus.BAD_REQUEST,
    });
  }
}
