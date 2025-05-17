import { ApiSecurity } from '@nestjs/swagger';

export const ApiAuthSecurity = () => ApiSecurity('Authorization');
