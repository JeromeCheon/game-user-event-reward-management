import { Module } from '@nestjs/common';
import { UserAuthService } from './application/user-auth.service';
import { AuthServerController } from './presentation/auth-server.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { USER_AUTH_REPOSITORY } from './domain/user-auth.repository';
import { MongooseUserAuthRepository } from '../infra/mongoose.user-auth.repository';
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
import { MongooseAdminAuthRepository } from '../infra/mongoose.admin-auth.repository';
import { OPERATOR_AUTH_REPOSITORY } from './domain/operator-auth.repository';
import { ADMIN_AUTH_REPOSITORY } from './domain/admin-auth.repository';
import { MongooseOperatorAuthRepository } from '../infra/mongoose.operator-auth.repository';
import { MongooseAuditorAuthRepository } from '../infra/mongoose.auditor-auth.repository';
import { AUDITOR_AUTH_REPOSITORY } from './domain/auditor-auth.repository';
import { AdminAuthService } from './application/admin-auth.service';
import { OperatorAuthService } from './application/operator-auth.service';
import { AuditorAuthService } from './application/auditor-auth.service';
import config from '@app/common';

const { username, password, host, port, userdb } = config.get('mongodb');
const uri = `mongodb://${username}:${password}@${host}:${port}`;

@Module({
  imports: [
    MongooseModule.forRoot(`${uri}/${userdb}`, {
      authSource: 'admin',
      tls: false,
      connectionName: 'User',
    }),
    MongooseModule.forRoot(`${uri}/${userdb}`, {
      authSource: 'admin',
      tls: false,
      connectionName: 'Admin',
    }),
    MongooseModule.forRoot(`${uri}/${userdb}`, {
      authSource: 'admin',
      tls: false,
      connectionName: 'Auditor',
    }),
    MongooseModule.forRoot(`${uri}/${userdb}`, {
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
    {
      provide: USER_AUTH_REPOSITORY,
      useClass: MongooseUserAuthRepository,
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
  ],
})
export class AuthServerModule {}
