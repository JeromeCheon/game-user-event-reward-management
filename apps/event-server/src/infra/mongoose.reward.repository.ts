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

  async insert(reward: Reward): Promise<void> {
    const doc = RewardDocument.fromDomain(reward);
    await this.rewardModel.create(doc);
  }

  async update(reward: Reward): Promise<void> {
    const doc = RewardDocument.fromDomain(reward);
    await this.rewardModel.updateOne({ _id: doc._id }, doc);
  }

  async findByEventIds(eventIds: string[]): Promise<Reward[]> {
    const docs = await this.rewardModel
      .find({ eventId: { $in: eventIds } })
      .lean();
    return docs.map((doc) =>
      Object.assign(new RewardDocument(), doc).toDomain(),
    );
  }

  async findByEventId(eventId: string): Promise<Reward | null> {
    const doc = await this.rewardModel.findOne({ eventId }).lean();
    return doc ? Object.assign(new RewardDocument(), doc).toDomain() : null;
  }

  async findAll(): Promise<Reward[]> {
    const docs = await this.rewardModel.find().lean();
    return docs.map((doc) =>
      Object.assign(new RewardDocument(), doc).toDomain(),
    );
  }

  async findById(id: string): Promise<Reward | null> {
    const doc = await this.rewardModel.findById(id).lean();
    return doc ? Object.assign(new RewardDocument(), doc).toDomain() : null;
  }
}
