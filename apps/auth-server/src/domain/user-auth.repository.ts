import { Repository } from '@app/common/base/repository';
import { User, UserProps } from './user';

export interface UserAuthRepository<T extends User<UserProps>>
  extends Repository<T> {
  findByName(name: string): Promise<T | null>;
  findByAccountAndName(account: string, name: string): Promise<T | null>;
}
