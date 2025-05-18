import { Module } from '@nestjs/common';
import { UserAuthService } from './application/user-auth/user-auth.service';
import { AuthServerController } from './presentation/auth-server.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { GAME_USER_AUTH_REPOSITORY } from './domain/user-auth/game-user-auth.repository';
import { MongooseGameUserAuthRepository } from './infra/mongoose.game-user-auth.repository';
import {
  GameUserDocument,
  GameUserSchema,
} from '@app/schema/schemas/user.schema';
import { AuditorSchema } from '@app/schema/schemas/auditor.schema';
import { OperatorDocument } from '@app/schema/schemas/operator.schema';
import { AdminSchema } from '@app/schema/schemas/admin.schema';
import { OperatorSchema } from '@app/schema/schemas/operator.schema';
import { AdminDocument } from '@app/schema/schemas/admin.schema';
import { AuditorDocument } from '@app/schema/schemas/auditor.schema';
import { MongooseAdminAuthRepository } from './infra/mongoose.admin-auth.repository';
import { OPERATOR_AUTH_REPOSITORY } from './domain/operator-auth/operator-auth.repository';
import { ADMIN_AUTH_REPOSITORY } from './domain/admin-auth/admin-auth.repository';
import { MongooseOperatorAuthRepository } from './infra/mongoose.operator-auth.repository';
import { MongooseAuditorAuthRepository } from './infra/mongoose.auditor-auth.repository';
import { AUDITOR_AUTH_REPOSITORY } from './domain/auditor-auth/auditor-auth.repository';
import { AdminAuthService } from './application/admin-auth/admin-auth.service';
import { OperatorAuthService } from './application/operator-auth/operator-auth.service';
import { AuditorAuthService } from './application/auditor-auth/auditor-auth.service';
import config from '@app/common';
import { JwtSessionPolicy } from './infra/jwt.session-policy';
import { SESSION_POLICY } from './domain/session-policy';
import { JwtService } from '@nestjs/jwt';
import { JwtModule } from '@nestjs/jwt';
import { ConnectionUrl } from '@app/common/variable/db-connection';

@Module({
  imports: [
    JwtModule.register({
      secret: config.get('jwt.secret'),
      signOptions: { expiresIn: config.get('jwt.expiresIn') },
    }),
    MongooseModule.forRoot(ConnectionUrl, {
      authSource: 'admin',
      tls: false,
      connectionName: 'User',
    }),
    MongooseModule.forRoot(ConnectionUrl, {
      authSource: 'admin',
      tls: false,
      connectionName: 'Admin',
    }),
    MongooseModule.forRoot(ConnectionUrl, {
      authSource: 'admin',
      tls: false,
      connectionName: 'Auditor',
    }),
    MongooseModule.forRoot(ConnectionUrl, {
      authSource: 'admin',
      tls: false,
      connectionName: 'Operator',
    }),
    MongooseModule.forFeature(
      [{ name: GameUserDocument.name, schema: GameUserSchema }],
      'User',
    ),
    MongooseModule.forFeature(
      [{ name: AdminDocument.name, schema: AdminSchema }],
      'Admin',
    ),
    MongooseModule.forFeature(
      [{ name: AuditorDocument.name, schema: AuditorSchema }],
      'Auditor',
    ),
    MongooseModule.forFeature(
      [{ name: OperatorDocument.name, schema: OperatorSchema }],
      'Operator',
    ),
  ],
  controllers: [AuthServerController],
  providers: [
    UserAuthService,
    AdminAuthService,
    AuditorAuthService,
    OperatorAuthService,
    JwtService,
    {
      provide: GAME_USER_AUTH_REPOSITORY,
      useClass: MongooseGameUserAuthRepository,
    },
    {
      provide: ADMIN_AUTH_REPOSITORY,
      useClass: MongooseAdminAuthRepository,
    },
    {
      provide: OPERATOR_AUTH_REPOSITORY,
      useClass: MongooseOperatorAuthRepository,
    },
    {
      provide: AUDITOR_AUTH_REPOSITORY,
      useClass: MongooseAuditorAuthRepository,
    },
    {
      provide: SESSION_POLICY,
      useClass: JwtSessionPolicy,
    },
  ],
})
export class AppModule {}
