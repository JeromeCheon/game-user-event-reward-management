import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Password } from '../../../../apps/auth-server/src/domain/password';
import { Role } from '@app/common/variable/role';
import { WorldServerType } from '@app/common/variable/world-server-type';
import { Admin } from 'apps/auth-server/src/domain/admin-auth/admin';

@Schema({
  collection: 'admins',
})
export class AdminDocument {
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
  baseServer: string;

  @Prop({ required: true })
  createdAt: Date;

  @Prop({ required: true })
  updatedAt: Date;

  @Prop({ required: true })
  isLoggedIn: boolean;

  static fromDomain(user: Admin): AdminDocument {
    const doc = new AdminDocument();
    doc._id = user.id;
    doc.account = user.account;
    doc.password = user.password.value;
    doc.name = user.name;
    doc.role = user.role;
    doc.baseServer = user.baseServer;
    doc.createdAt = user.createdAt;
    doc.updatedAt = user.updatedAt;
    doc.isLoggedIn = user.isLoggedIn;

    return doc;
  }

  toDomain(): Admin {
    return Admin.from(
      {
        account: this.account,
        password: Password.from(this.password),
        name: this.name,
        role: this.role as Role,
        baseServer: this.baseServer as WorldServerType,
        createdAt: this.createdAt,
        updatedAt: this.updatedAt,
        isLoggedIn: this.isLoggedIn,
      },
      this._id,
    );
  }
}

export type AdminModel = AdminDocument & Document;
export const AdminSchema = SchemaFactory.createForClass(AdminDocument);
