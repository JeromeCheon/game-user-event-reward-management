import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Password } from '../../../../apps/auth-server/src/domain/password';
import { Role } from '@app/common/variable/role';
import { WorldServerType } from '@app/common/variable/world-server-type';
import {
  MapleJobType,
  MapleJobTitle,
} from '@app/common/variable/maple-job-info';
import { MapleJobInfoSchema } from './user.schema';
import { MapleJobInfoDocument } from './user.schema';
import { Operator } from 'apps/auth-server/src/domain/operator-auth/operator';

@Schema({
  collection: 'operators',
})
export class OperatorDocument {
  @Prop({ type: String })
  _id: string;

  @Prop({ required: true })
  account: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  role: string;

  @Prop({ required: true })
  level: number;

  @Prop({ required: true })
  baseServer: string;

  @Prop({ required: true, type: MapleJobInfoSchema, _id: false })
  job: MapleJobInfoDocument;

  @Prop({ required: true })
  createdAt: Date;

  @Prop({ required: true })
  updatedAt: Date;

  @Prop({ required: true })
  isLoggedIn: boolean;

  static fromDomain(user: Operator): OperatorDocument {
    const doc = new OperatorDocument();
    doc._id = user.id;
    doc.account = user.account;
    doc.password = user.password.value;
    doc.name = user.name;
    doc.role = user.role;
    doc.level = user.level;
    doc.baseServer = user.baseServer;
    doc.createdAt = user.createdAt;
    doc.updatedAt = user.updatedAt;
    doc.isLoggedIn = user.isLoggedIn;
    const job = new MapleJobInfoDocument();
    job.type = user.job.type;
    job.title = user.job.title;
    job.degree = user.job.degree;
    doc.job = job;
    return doc;
  }

  toDomain(): Operator {
    return Operator.from(
      {
        account: this.account,
        password: Password.from(this.password),
        name: this.name,
        role: this.role as Role,
        level: this.level,
        baseServer: this.baseServer as WorldServerType,
        job: {
          type: this.job.type as MapleJobType,
          title: this.job.title as MapleJobTitle,
          degree: this.job.degree,
        },
        createdAt: this.createdAt,
        updatedAt: this.updatedAt,
        isLoggedIn: this.isLoggedIn,
      },
      this._id,
    );
  }
}

export type OperatorModel = OperatorDocument & Document;
export const OperatorSchema = SchemaFactory.createForClass(OperatorDocument);
