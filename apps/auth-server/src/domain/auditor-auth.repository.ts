import { Auditor } from './auditor';
import { UserAuthRepository } from './user-auth.repository';

export const AUDITOR_AUTH_REPOSITORY = Symbol('AUDITOR_AUTH_REPOSITORY');

export interface AuditorAuthRepository extends UserAuthRepository<Auditor> {}
