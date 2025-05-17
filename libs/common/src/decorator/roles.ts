import { SetMetadata } from '@nestjs/common';
import { Role } from '../variable/role';
import { ROLES } from '../variable/symbols';

export const Roles = (...roles: Role[]) => SetMetadata(ROLES, roles);
