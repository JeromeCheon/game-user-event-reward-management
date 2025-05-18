import { Operator } from '../operator-auth/operator';
import { UserAuthRepository } from '../user-auth/user-auth.repository';

export const OPERATOR_AUTH_REPOSITORY = Symbol('OPERATOR_AUTH_REPOSITORY');

export interface OperatorAuthRepository extends UserAuthRepository<Operator> {}
