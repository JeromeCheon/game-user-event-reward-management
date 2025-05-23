import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { AuthUserInfo } from '../dto/auth-user-info';

export const AuthUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user as AuthUserInfo;
  },
);
