import { Repository } from '@app/common/base/repository';
import { GameUser } from './game-user';

export const USER_AUTH_REPOSITORY = Symbol('USER_AUTH_REPOSITORY');

export interface UserAuthRepository extends Repository<GameUser> {
  findByName(name: string): Promise<GameUser | null>;
}
