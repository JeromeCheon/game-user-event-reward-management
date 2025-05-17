import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Password } from '../../../../apps/auth-server/src/domain/password';
import { Role } from '@app/common/role';
import { GameUser } from 'apps/auth-server/src/domain/game-user';
import { WorldServerType } from '@app/common/world-server-type';
import { MapleJobType, MapleJobTitle } from '@app/common/maple-job-info';

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
  collection: 'game-users',
})
export class GameUserDocument {
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

  @Prop({ required: false })
  recommandorAccount: string;

  @Prop({ required: true })
  createdAt: Date;

  @Prop({ required: true })
  updatedAt: Date;

  @Prop({ required: true })
  isLoggedIn: boolean;

  @Prop({ required: true })
  isBanned: boolean;

  @Prop({ required: false })
  lastLoginAt?: Date;

  static fromDomain(user: GameUser): GameUserDocument {
    const doc = new GameUserDocument();
    doc._id = user.id;
    doc.account = user.account;
    doc.password = user.password.value;
    doc.name = user.name;
    doc.role = user.role;
    doc.level = user.level;
    doc.baseServer = user.baseServer;
    if (user.recommandorAccount) {
      doc.recommandorAccount = user.recommandorAccount;
    }
    if (user.lastLoginAt) {
      doc.lastLoginAt = user.lastLoginAt;
    }
    doc.createdAt = user.createdAt;
    doc.updatedAt = user.updatedAt;
    doc.isLoggedIn = user.isLoggedIn;
    doc.isBanned = user.isBanned;
    const job = new MapleJobInfoDocument();
    job.type = user.job.type;
    job.title = user.job.title;
    job.degree = user.job.degree;
    doc.job = job;

    return doc;
  }

  toDomain(): GameUser {
    return GameUser.from(
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
        recommandorAccount: this.recommandorAccount ?? undefined,
        createdAt: this.createdAt,
        updatedAt: this.updatedAt,
        isLoggedIn: this.isLoggedIn,
        isBanned: this.isBanned,
        lastLoginAt: this.lastLoginAt ?? undefined,
      },
      this._id,
    );
  }
}

export type GameUserModel = GameUserDocument & Document;
export const GameUserSchema = SchemaFactory.createForClass(GameUserDocument);
