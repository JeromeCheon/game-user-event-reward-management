import { Module } from '@nestjs/common';
import { UserAuthService } from './application/user-auth.service';
import { AuthServerController } from './presentation/auth-server.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CqrsModule } from '@nestjs/cqrs';
import { USER_AUTH_REPOSITORY } from './domain/user-auth.repository';
import { MongooseUserAuthRepository } from '../infra/mongoose.user-auth.repository';
import {
  GameUserDocument,
  GameUserSchema,
} from '@app/schema/schemas/user.schema';

// TODO: 환경변수로 변경
const uri = `mongodb://maple:story@localhost:27017/User`;

@Module({
  imports: [
    MongooseModule.forRoot(uri, {
      authSource: 'admin',
      tls: false,
    }),
    MongooseModule.forFeature([
      { name: GameUserDocument.name, schema: GameUserSchema },
    ]),
    CqrsModule.forRoot(),
  ],
  controllers: [AuthServerController],
  providers: [
    UserAuthService,
    {
      provide: USER_AUTH_REPOSITORY,
      useClass: MongooseUserAuthRepository,
    },
  ],
})
export class AuthServerModule {}
