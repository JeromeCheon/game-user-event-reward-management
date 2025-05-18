import { GameUser } from './game-user';
import { UserAuthRepository } from './user-auth.repository';

export const GAME_USER_AUTH_REPOSITORY = Symbol('GAME_USER_AUTH_REPOSITORY');

export interface GameUserAuthRepository extends UserAuthRepository<GameUser> {}
