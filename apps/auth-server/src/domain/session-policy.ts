import { User, UserProps } from './user';

export const SESSION_POLICY = Symbol('SESSION_POLICY');

export interface SessionPolicy {
  issueToken(user: User<UserProps>): Promise<string>;
}
