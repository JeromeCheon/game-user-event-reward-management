import { Injectable } from '@nestjs/common';
import { GameUserAuthRepository } from '../domain/user-auth/game-user-auth.repository';
import { Model } from 'mongoose';
import {
  GameUserDocument,
  GameUserModel,
} from '@app/schema/schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { GameUser } from '../domain/user-auth/game-user';

@Injectable()
export class MongooseGameUserAuthRepository implements GameUserAuthRepository {
  constructor(
    @InjectModel(GameUserDocument.name, 'User')
    private readonly userModel: Model<GameUserModel>,
  ) {}

  async insert(user: GameUser): Promise<void> {
    const userDoc = GameUserDocument.fromDomain(user);
    await this.userModel.create(userDoc);
  }

  async findByName(name: string): Promise<GameUser | null> {
    const doc = await this.userModel.findOne({ name }).lean();
    if (!doc) return null;
    const userDoc = Object.assign(new GameUserDocument(), doc);
    return userDoc.toDomain();
  }

  async findByAccountAndName(
    account: string,
    name: string,
  ): Promise<GameUser | null> {
    const doc = await this.userModel.findOne({ account, name }).lean();
    if (!doc) return null;
    const userDoc = Object.assign(new GameUserDocument(), doc);
    return userDoc.toDomain();
  }

  async update(user: GameUser): Promise<void> {
    const userDoc = GameUserDocument.fromDomain(user);
    await this.userModel.updateOne({ _id: userDoc._id }, userDoc);
  }
}
