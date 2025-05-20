import { Injectable } from '@nestjs/common';
import { UserAuthRepository } from '../domain/user-auth.repository';
import { Model } from 'mongoose';
import { UserDocument, UserModel } from '@app/schema/schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../domain/user';
import { Role } from '@app/common/variable/role';

@Injectable()
export class MongooseUserAuthRepository implements UserAuthRepository {
  constructor(
    @InjectModel(UserDocument.name)
    private readonly userModel: Model<UserModel>,
  ) {}

  async insert(user: User): Promise<void> {
    const userDoc = UserDocument.fromDomain(user);
    await this.userModel.create(userDoc);
  }

  async findByName(name: string): Promise<User | null> {
    const doc = await this.userModel.findOne({ name }).lean();
    if (!doc) return null;
    const userDoc = Object.assign(new UserDocument(), doc);
    return userDoc.toDomain();
  }

  async findByAccountAndName(
    account: string,
    name: string,
  ): Promise<User | null> {
    const doc = await this.userModel.findOne({ account, name }).lean();
    if (!doc) return null;
    const userDoc = Object.assign(new UserDocument(), doc);
    return userDoc.toDomain();
  }

  async findByRole(role: Role): Promise<User[]> {
    const docs = await this.userModel.find({ role }).lean();
    return docs.map((doc) => Object.assign(new UserDocument(), doc).toDomain());
  }

  async update(user: User): Promise<void> {
    const userDoc = UserDocument.fromDomain(user);
    await this.userModel.updateOne({ _id: userDoc._id }, userDoc);
  }
}
