import { User } from './user';

export const SESSION_POLICY = Symbol('SESSION_POLICY');

export interface SessionPolicy {
  issueToken(user: User): Promise<string>;
}
