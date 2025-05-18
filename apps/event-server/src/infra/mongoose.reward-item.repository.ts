import {
  RewardItemDocument,
  RewardItemModel,
} from '@app/schema/schemas/reward-item.schema';
import { RewardItemRepository } from '../domain/reward-item/reward-item.repository';
import { Model } from 'mongoose';
import { RewardItem } from '../domain/reward-item/reward-item';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class MongooseRewardItemRepository implements RewardItemRepository {
  constructor(
    @InjectModel(RewardItemDocument.name)
    private readonly rewardItemModel: Model<RewardItemModel>,
  ) {}

  async insert(entity: RewardItem): Promise<void> {
    const doc = RewardItemDocument.fromDomain(entity);
    await this.rewardItemModel.create(doc);
  }

  async update(entity: RewardItem): Promise<void> {
    const doc = RewardItemDocument.fromDomain(entity);
    await this.rewardItemModel.updateOne({ _id: doc._id }, doc);
  }

  async findAll(): Promise<RewardItem[]> {
    const docs = await this.rewardItemModel.find().lean();
    return docs.map((doc) =>
      Object.assign(new RewardItemDocument(), doc).toDomain(),
    );
  }
}
