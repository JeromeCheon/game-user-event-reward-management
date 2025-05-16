import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from '../../../../apps/auth-server/src/domain/user';
import { Password } from '../../../../apps/auth-server/src/domain/password';
import { Role } from '@app/common/role';

@Schema({
  collection: 'user',
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

  @Prop({ required: true })
  role: string;

  static fromDomain(user: User): UserDocument {
    const doc = new UserDocument();
    doc._id = user.id;
    doc.account = user.account;
    doc.password = user.password.value;
    doc.name = user.name;
    doc.role = user.role;
    return doc;
  }

  toDomain(): User {
    return User.from(
      {
        account: this.account,
        password: Password.from(this.password),
        name: this.name,
        role: this.role as Role,
      },
      this._id,
    );
  }
}

export type UserModel = UserDocument & Document;
export const UserSchema = SchemaFactory.createForClass(UserDocument);
