import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { OperatorAuthRepository } from '../src/domain/operator-auth.repository';
import { OperatorDocument } from '@app/schema/schemas/operator.schema';
import { OperatorModel } from '@app/schema/schemas/operator.schema';
import { Operator } from '../src/domain/operator';

@Injectable()
export class MongooseOperatorAuthRepository implements OperatorAuthRepository {
  constructor(
    @InjectModel(OperatorDocument.name, 'Operator')
    private readonly operatorModel: Model<OperatorModel>,
  ) {}

  async insert(user: Operator): Promise<void> {
    const userDoc = OperatorDocument.fromDomain(user);
    await this.operatorModel.create(userDoc);
  }

  async findByName(name: string): Promise<Operator | null> {
    const doc = await this.operatorModel.findOne({ name }).lean();
    if (!doc) return null;
    const userDoc = Object.assign(new OperatorDocument(), doc);
    return userDoc.toDomain();
  }

  async findByAccountAndName(
    account: string,
    name: string,
  ): Promise<Operator | null> {
    const doc = await this.operatorModel.findOne({ account, name }).lean();
    if (!doc) return null;
    const userDoc = Object.assign(new OperatorDocument(), doc);
    return userDoc.toDomain();
  }

  async update(user: Operator): Promise<void> {
    const userDoc = OperatorDocument.fromDomain(user);
    await this.operatorModel.updateOne({ _id: userDoc._id }, userDoc);
  }
}
