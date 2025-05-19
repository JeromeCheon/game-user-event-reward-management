import { Injectable } from '@nestjs/common';
import { LookupUserRepository } from '../domain/user-event-progress/lookup-user-repository';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import {
  GameUserDocument,
  GameUserModel,
} from '@app/schema/schemas/user.schema';

@Injectable()
export class MongooseLookupUserRepository implements LookupUserRepository {
  constructor(
    @InjectModel(GameUserDocument.name)
    private readonly userModel: Model<GameUserModel>,
  ) {}

  async getUserIdsExceptBanned(): Promise<string[]> {
    const users = await this.userModel.find({ isBanned: false }).lean();
    return users.map((user) => user._id);
  }

  async getUserLevelById(userId: string): Promise<number> {
    const user = await this.userModel.findById(userId).lean();
    return user.level;
  }
}
