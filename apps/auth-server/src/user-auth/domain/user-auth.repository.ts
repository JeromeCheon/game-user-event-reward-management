import { Repository } from '@app/common/base/repository';
import { User as User } from './user';
import { Role } from '@app/common/variable/role';

export const USER_AUTH_REPOSITORY = Symbol('USER_AUTH_REPOSITORY');

export interface UserAuthRepository extends Repository<User> {
  findByName(name: string): Promise<User | null>;
  findByAccountAndName(account: string, name: string): Promise<User | null>;
  findByRole(role: Role): Promise<User[]>;
}
