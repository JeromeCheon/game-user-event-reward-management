import { Injectable } from '@nestjs/common';
import { LookupUserRepository } from '../domain/user-event-progress/lookup-user-repository';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { UserDocument, UserModel } from '@app/schema/schemas/user.schema';
import { Role } from '@app/common/variable/role';

@Injectable()
export class MongooseLookupUserRepository implements LookupUserRepository {
  constructor(
    @InjectModel(UserDocument.name)
    private readonly userModel: Model<UserModel>,
  ) {}

  async getUserIdsExceptBanned(): Promise<string[]> {
    const users = await this.userModel
      .find({ isBanned: false, role: Role.USER })
      .lean();
    return users.map((user) => user._id);
  }

  async getUserLevelById(userId: string): Promise<number> {
    const user = await this.userModel.findById(userId).lean();
    return user.level;
  }

  async getUserIdByName(name: string): Promise<string | null> {
    const user = await this.userModel.findOne({ name }).lean();
    return user._id ?? null;
  }
}
