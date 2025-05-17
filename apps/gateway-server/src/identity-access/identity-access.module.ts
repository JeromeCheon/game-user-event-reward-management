import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AUTH_SERVER } from '@app/common/symbols';
import { IdentityAccessService } from './identity-access.service';
import { IdentityAccessController } from './identity-access.controller';

@Module({
  imports: [
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
  providers: [IdentityAccessService],
  exports: [],
  controllers: [IdentityAccessController],
})
export class IdentityAccessModule {}
