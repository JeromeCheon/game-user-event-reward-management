import { Model } from 'mongoose';
import { EventRewardClaimHistory } from '../domain/event/event-reward-claim-history';
import { EventRewardClaimHistoryRepository } from '../domain/event/event-reward-claim-history.repository';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { EventRewardClaimHistoryDocument } from '@app/schema/schemas/event-reward-claim-history.schema';

@Injectable()
export class MongooseEventRewardClaimHistoryRepository
  implements EventRewardClaimHistoryRepository
{
  constructor(
    @InjectModel(EventRewardClaimHistoryDocument.name)
    private readonly historyModel: Model<EventRewardClaimHistoryDocument>,
  ) {}

  async insert(
    eventRewardClaimHistory: EventRewardClaimHistory,
  ): Promise<void> {
    const doc = EventRewardClaimHistoryDocument.fromDomain(
      eventRewardClaimHistory,
    );
    await this.historyModel.create(doc);
  }

  async findAll(): Promise<EventRewardClaimHistory[]> {
    const docs = await this.historyModel.find().sort({ recordedAt: -1 }).lean();
    return docs.map((doc) =>
      Object.assign(new EventRewardClaimHistoryDocument(), doc).toDomain(),
    );
  }

  async findByUserId(userId: string): Promise<EventRewardClaimHistory[]> {
    const docs = await this.historyModel
      .find({ userId })
      .sort({ recordedAt: -1 })
      .lean();
    return docs.map((doc) =>
      Object.assign(new EventRewardClaimHistoryDocument(), doc).toDomain(),
    );
  }
}
