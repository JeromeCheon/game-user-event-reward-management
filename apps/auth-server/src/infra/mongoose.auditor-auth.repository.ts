import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Auditor } from '../domain/auditor-auth/auditor';
import {
  AuditorDocument,
  AuditorModel,
} from '@app/schema/schemas/auditor.schema';
import { AuditorAuthRepository } from '../domain/auditor-auth/auditor-auth.repository';

@Injectable()
export class MongooseAuditorAuthRepository implements AuditorAuthRepository {
  constructor(
    @InjectModel(AuditorDocument.name, 'Auditor')
    private readonly auditorModel: Model<AuditorModel>,
  ) {}

  async insert(user: Auditor): Promise<void> {
    const userDoc = AuditorDocument.fromDomain(user);
    await this.auditorModel.create(userDoc);
  }

  async findByName(name: string): Promise<Auditor | null> {
    const doc = await this.auditorModel.findOne({ name }).lean();
    if (!doc) return null;
    const userDoc = Object.assign(new AuditorDocument(), doc);
    return userDoc.toDomain();
  }

  async findByAccountAndName(
    account: string,
    name: string,
  ): Promise<Auditor | null> {
    const doc = await this.auditorModel.findOne({ account, name }).lean();
    if (!doc) return null;
    const userDoc = Object.assign(new AuditorDocument(), doc);
    return userDoc.toDomain();
  }

  async update(user: Auditor): Promise<void> {
    const userDoc = AuditorDocument.fromDomain(user);
    await this.auditorModel.updateOne({ _id: userDoc._id }, userDoc);
  }
}
