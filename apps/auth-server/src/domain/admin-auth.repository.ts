import { Repository } from '@app/common/base/repository';
import { Admin } from './admin';

export const ADMIN_AUTH_REPOSITORY = Symbol('ADMIN_AUTH_REPOSITORY');

export interface AdminAuthRepository extends Repository<Admin> {
  findByName(name: string): Promise<Admin | null>;
}
