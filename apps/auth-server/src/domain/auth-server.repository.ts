import { Repository } from '@app/common/base/repository';
import { User } from './user';

export const AUTH_SERVER_REPOSITORY = Symbol('AUTH_SERVER_REPOSITORY');

export interface AuthServerRepository extends Repository<User> {
  findByName(name: string): Promise<User | null>;
}
