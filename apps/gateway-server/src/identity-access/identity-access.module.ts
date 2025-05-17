import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AUTH_SERVER } from '@app/common/variable/symbols';
import { IdentityAccessService } from './identity-access.service';
import { IdentityAccessController } from './identity-access.controller';
import { JwtModule } from '@nestjs/jwt';
import config from '@app/common';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    JwtModule.register({
      secret: config.get('jwt.secret'),
      signOptions: { expiresIn: config.get('jwt.expiresIn') },
    }),
    ClientsModule.register([
      {
        name: AUTH_SERVER,
        transport: Transport.TCP,
        options: {
          host: 'localhost',
          port: 3001,
        },
      },
    ]),
  ],
  providers: [IdentityAccessService, JwtStrategy],
  exports: [JwtStrategy],
  controllers: [IdentityAccessController],
})
export class IdentityAccessModule {}
