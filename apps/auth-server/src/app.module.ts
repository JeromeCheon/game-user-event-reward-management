import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { JwtModule } from '@nestjs/jwt';

import { MongooseUserAuthRepository } from './user-auth/infra/mongoose.user-auth.repository';
import { SESSION_POLICY } from './user-auth/domain/session-policy';
import { JwtSessionPolicy } from './user-auth/infra/jwt.session-policy';
import { ConnectionUrl } from '@app/common/variable/db-connection';
import config from '@app/common';
import { UserDocument, UserSchema } from '@app/schema/schemas/user.schema';
import { UserAuthController } from './user-auth/presentation/user-auth.controller';
import { CreateGameUserService } from './user-auth/application/create-game-user.service';
import { CreateAdminUserService } from './user-auth/application/create-admin-user.service';
import { CreateAuditorUserService } from './user-auth/application/create-auditor-user.service';
import { CreateOperatorUserService } from './user-auth/application/create-operator-user.service';
import { LoginUserService } from './user-auth/application/login-user.service';
import { USER_AUTH_REPOSITORY } from './user-auth/domain/user-auth.repository';

@Module({
  imports: [
    JwtModule.register({
      secret: config.get('jwt.secret'),
      signOptions: { expiresIn: config.get('jwt.expiresIn') },
    }),
    MongooseModule.forRoot(ConnectionUrl, {
      authSource: 'admin',
      tls: false,
    }),
    MongooseModule.forFeature([
      { name: UserDocument.name, schema: UserSchema },
    ]),
  ],
  controllers: [UserAuthController],
  providers: [
    CreateGameUserService,
    CreateAdminUserService,
    CreateAuditorUserService,
    CreateOperatorUserService,
    LoginUserService,
    JwtService,
    {
      provide: USER_AUTH_REPOSITORY,
      useClass: MongooseUserAuthRepository,
    },
    {
      provide: SESSION_POLICY,
      useClass: JwtSessionPolicy,
    },
  ],
})
export class AppModule {}
