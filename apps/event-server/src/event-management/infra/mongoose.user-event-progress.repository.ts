import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import {
  UserEventProgressDocument,
  UserEventProgressModel,
} from '@app/schema/schemas/user-event-progress.schema';
import { UserEventProgressRepository } from '../domain/user-event-progress/user-event-progress.repository';
import { UserEventProgress } from '../domain/user-event-progress/user-event-progress';

@Injectable()
export class MongooseUserEventProgressRepository
  implements UserEventProgressRepository
{
  constructor(
    @InjectModel(UserEventProgressDocument.name)
    private readonly progressModel: Model<UserEventProgressModel>,
  ) {}

  async insert(progress: UserEventProgress): Promise<void> {
    const doc = UserEventProgressDocument.fromDomain(progress);
    await this.progressModel.create(doc);
  }

  async update(progress: UserEventProgress): Promise<void> {
    const doc = UserEventProgressDocument.fromDomain(progress);
    await this.progressModel.updateOne({ _id: doc._id }, doc);
  }

  async updateWithLock(
    progress: UserEventProgress,
    prevUpdatedAt: Date,
  ): Promise<boolean> {
    const doc = UserEventProgressDocument.fromDomain(progress);
    const result = await this.progressModel.updateOne(
      { _id: doc._id, updatedAt: prevUpdatedAt },
      { $set: doc },
    );
    return result.modifiedCount === 1;
  }

  async insertMany(progresses: UserEventProgress[]): Promise<void> {
    const docs = progresses.map((progress) =>
      UserEventProgressDocument.fromDomain(progress),
    );
    await this.progressModel.insertMany(docs);
  }

  async findOneByEventIdAndUserId(
    eventId: string,
    userId: string,
  ): Promise<UserEventProgress | null> {
    const doc = await this.progressModel.findOne({ eventId, userId }).lean();
    return doc
      ? Object.assign(new UserEventProgressDocument(), doc).toDomain()
      : null;
  }
}
