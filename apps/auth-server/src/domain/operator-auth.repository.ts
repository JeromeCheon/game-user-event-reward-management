import { Repository } from '@app/common/base/repository';
import { Operator } from './operator';

export const OPERATOR_AUTH_REPOSITORY = Symbol('OPERATOR_AUTH_REPOSITORY');

export interface OperatorAuthRepository extends Repository<Operator> {
  findByName(name: string): Promise<Operator | null>;
}
