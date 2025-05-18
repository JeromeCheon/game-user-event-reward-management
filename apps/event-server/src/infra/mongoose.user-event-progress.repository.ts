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

  async insertMany(progresses: UserEventProgress[]): Promise<void> {
    const docs = progresses.map((progress) =>
      UserEventProgressDocument.fromDomain(progress),
    );
    await this.progressModel.insertMany(docs);
  }
}
