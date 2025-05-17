import { Repository } from '@app/common/base/repository';
import { Auditor } from './auditor';

export const AUDITOR_AUTH_REPOSITORY = Symbol('AUDITOR_AUTH_REPOSITORY');

export interface AuditorAuthRepository extends Repository<Auditor> {
  findByName(name: string): Promise<Auditor | null>;
}
