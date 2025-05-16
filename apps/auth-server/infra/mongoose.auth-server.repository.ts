import { Injectable } from '@nestjs/common';
import { AuthServerRepository } from '../src/domain/auth-server.repository';
import { User } from '../src/domain/user';
import { Model } from 'mongoose';
import { UserDocument } from '@app/schema/schemas/user.schema';
import { UserModel } from '@app/schema/schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class MongooseAuthServerRepository implements AuthServerRepository {
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
}
