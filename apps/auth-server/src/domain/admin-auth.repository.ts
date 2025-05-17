import { Admin } from './admin';
import { UserAuthRepository } from './user-auth.repository';

export const ADMIN_AUTH_REPOSITORY = Symbol('ADMIN_AUTH_REPOSITORY');

export interface AdminAuthRepository extends UserAuthRepository<Admin> {}
