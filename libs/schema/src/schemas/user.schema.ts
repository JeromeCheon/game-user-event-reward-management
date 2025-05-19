import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Role } from '@app/common/variable/role';
import { WorldServerType } from '@app/common/variable/world-server-type';
import { MapleJobInfo } from '@app/common/variable/maple-job-info';
import { User } from 'apps/auth-server/src/user-auth/domain/user';
import { Password } from 'apps/auth-server/src/user-auth/domain/password';

@Schema()
export class MapleJobInfoDocument {
  @Prop()
  type: string;

  @Prop()
  title: string;

  @Prop()
  degree: 0 | 1 | 2 | 3 | 4 | 5;
}

export const MapleJobInfoSchema =
  SchemaFactory.createForClass(MapleJobInfoDocument);

@Schema({
  collection: 'users',
})
export class UserDocument {
  @Prop({ type: String })
  _id: string;

  @Prop({ required: true })
  account: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true, type: String, enum: Role })
  role: Role;

  @Prop({ required: true, type: String, enum: WorldServerType })
  baseServer: WorldServerType;

  @Prop({ required: true })
  createdAt: Date;

  @Prop({ required: true })
  updatedAt: Date;

  @Prop({ required: true })
  isLoggedIn: boolean;

  @Prop({ required: false })
  level?: number;

  @Prop({ required: false, type: MapleJobInfoSchema, _id: false })
  job?: MapleJobInfoDocument;

  @Prop({ required: false, default: false })
  isBanned?: boolean;

  @Prop({ required: false })
  lastLoginAt?: Date;

  static fromDomain(user: User): UserDocument {
    const doc = new UserDocument();
    doc._id = user.id;
    doc.account = user.account;
    doc.password = user.password.value;
    doc.name = user.name;
    doc.role = user.role;
    doc.baseServer = user.baseServer;
    doc.createdAt = user.createdAt;
    doc.updatedAt = user.updatedAt;
    doc.isLoggedIn = user.isLoggedIn;

    doc.lastLoginAt = user.lastLoginAt;

    doc.level = user.level;

    if (user.job) {
      const job = new MapleJobInfoDocument();
      job.type = user.job.type;
      job.title = user.job.title;
      job.degree = user.job.degree;
      doc.job = job;
    }

    doc.isBanned = user.isBanned;

    return doc;
  }

  toDomain(): User {
    return User.from(
      {
        account: this.account,
        password: Password.from(this.password),
        name: this.name,
        role: this.role as Role,
        baseServer: this.baseServer as WorldServerType,
        createdAt: this.createdAt,
        updatedAt: this.updatedAt,
        isLoggedIn: this.isLoggedIn,
        lastLoginAt: this.lastLoginAt,
        level: this.level,
        job: { ...this.job } as MapleJobInfo,
        isBanned: this.isBanned,
      },
      this._id,
    );
  }
}

export type UserModel = UserDocument & Document;
export const UserSchema = SchemaFactory.createForClass(UserDocument);
