import { Injectable } from '@nestjs/common';
import { UserAuthRepository } from '../src/domain/user-auth.repository';
import { Model } from 'mongoose';
import { GameUserDocument } from '@app/schema/schemas/user.schema';
import { GameUserModel } from '@app/schema/schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { GameUser } from '../src/domain/game-user';
@Injectable()
export class MongooseUserAuthRepository implements UserAuthRepository {
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
}
