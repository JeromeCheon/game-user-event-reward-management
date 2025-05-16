import { AggregateRoot } from '@app/common/base/aggregate-root';
import { Role } from '@app/common/role';
import { Password } from './password';

interface UserProps {
  account: string;
  password: Password;
  name: string;
  role: Role;
}

export class User extends AggregateRoot<UserProps> {
  private constructor(props: UserProps, id?: string) {
    super(props, id);
  }

  get account(): string {
    return this.props.account;
  }

  get password(): Password {
    return this.props.password;
  }

  get name(): string {
    return this.props.name;
  }

  get role(): Role {
    return this.props.role;
  }

  static create(props: UserProps, id?: string): User {
    const user = new User(props, id);
    return user;
  }

  static from(props: UserProps, id?: string): User {
    const user = new User(props, id);
    return user;
  }
}
