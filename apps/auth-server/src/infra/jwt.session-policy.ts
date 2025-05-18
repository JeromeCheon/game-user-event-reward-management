import config from '@app/common';
import { SessionPolicy } from '../domain/session-policy';
import { UserProps, User } from '../domain/user-auth/user';
import { JwtService } from '@nestjs/jwt';
import { Inject } from '@nestjs/common';
import { SessionPayload } from '@app/common/dto/session.payload';

export class JwtSessionPolicy implements SessionPolicy {
  constructor(
    @Inject()
    private readonly jwtService: JwtService,
  ) {}

  async issueToken(user: User<UserProps>): Promise<string> {
    const payload: SessionPayload = {
      id: user.id,
      role: user.role,
      expiredAt: new Date(Date.now() + config.get('jwt.expiresIn')),
    };

    return this.jwtService.sign(payload, {
      secret: config.get('jwt.secret'),
      expiresIn: config.get('jwt.expiresIn'),
    });
  }
}
