import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { AdminAuthRepository } from '../src/domain/admin-auth.repository';
import { AdminDocument } from '@app/schema/schemas/admin.schema';
import { AdminModel } from '@app/schema/schemas/admin.schema';
import { Admin } from '../src/domain/admin';

@Injectable()
export class MongooseAdminAuthRepository implements AdminAuthRepository {
  constructor(
    @InjectModel(AdminDocument.name, 'Admin')
    private readonly adminModel: Model<AdminModel>,
  ) {}

  async insert(user: Admin): Promise<void> {
    const userDoc = AdminDocument.fromDomain(user);
    await this.adminModel.create(userDoc);
  }

  async findByName(name: string): Promise<Admin | null> {
    const doc = await this.adminModel.findOne({ name }).lean();
    if (!doc) return null;
    const userDoc = Object.assign(new AdminDocument(), doc);
    return userDoc.toDomain();
  }

  async findByAccountAndName(
    account: string,
    name: string,
  ): Promise<Admin | null> {
    const doc = await this.adminModel.findOne({ account, name }).lean();
    if (!doc) return null;
    const userDoc = Object.assign(new AdminDocument(), doc);
    return userDoc.toDomain();
  }

  async update(user: Admin): Promise<void> {
    const userDoc = AdminDocument.fromDomain(user);
    await this.adminModel.updateOne({ _id: userDoc._id }, userDoc);
  }
}
