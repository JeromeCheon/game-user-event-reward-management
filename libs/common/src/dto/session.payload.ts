import { Role } from '../role';

export interface SessionPayload {
  id: string;
  role: Role;
  expiredAt: Date;
}
