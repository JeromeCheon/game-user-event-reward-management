import { Module } from '@nestjs/common';
import { AuthServerService } from './application/auth-server.service';
import { AuthServerController } from './presentation/auth-server.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CqrsModule } from '@nestjs/cqrs';
import { AUTH_SERVER_REPOSITORY } from './domain/auth-server.repository';
import { MongooseAuthServerRepository } from '../infra/mongoose.auth-server.repository';
import { UserDocument, UserSchema } from '@app/schema/schemas/user.schema';

// TODO: 환경변수로 변경
const uri = `mongodb://maple:story@localhost:27017/User`;

@Module({
  imports: [
    MongooseModule.forRoot(uri, {
      authSource: 'admin',
      tls: false,
    }),
    MongooseModule.forFeature([
      { name: UserDocument.name, schema: UserSchema },
    ]),
    CqrsModule.forRoot(),
  ],
  controllers: [AuthServerController],
  providers: [
    AuthServerService,
    {
      provide: AUTH_SERVER_REPOSITORY,
      useClass: MongooseAuthServerRepository,
    },
  ],
})
export class AuthServerModule {}
