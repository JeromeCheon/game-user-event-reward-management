import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { RewardRepository } from '../domain/reward/reward.repository';
import { RewardDocument } from '@app/schema/schemas/reward.schema';
import { RewardModel } from '@app/schema/schemas/reward.schema';
import { Reward } from '../domain/reward/reward';

@Injectable()
export class MongooseRewardRepository implements RewardRepository {
  constructor(
    @InjectModel(RewardDocument.name)
    private readonly rewardModel: Model<RewardModel>,
  ) {}

  async insert(entity: Reward): Promise<void> {
    const doc = RewardDocument.fromDomain(entity);
    await this.rewardModel.create(doc);
  }

  async update(entity: Reward): Promise<void> {
    const doc = RewardDocument.fromDomain(entity);
    await this.rewardModel.updateOne({ _id: doc._id }, doc);
  }
}
