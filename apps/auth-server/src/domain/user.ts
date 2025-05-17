import { AggregateRoot } from '@app/common/base/aggregate-root';
import { Role } from '@app/common/role';
import { Password } from './password';
import { WorldServerType } from '@app/common/world-server-type';

export interface UserProps {
  account: string;
  password: Password;
  name: string;
  role: Role;
  baseServer: WorldServerType;
  createdAt: Date;
  updatedAt: Date;
  isLoggedIn: boolean;
  lastLoginAt?: Date;
}

export class User<T extends UserProps> extends AggregateRoot<T> {
  protected constructor(props: T, id?: string) {
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

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }

  get isLoggedIn(): boolean {
    return this.props.isLoggedIn;
  }

  get baseServer(): WorldServerType {
    return this.props.baseServer;
  }

  get lastLoginAt(): Date | undefined {
    return this.props.lastLoginAt;
  }

  static create(props: UserProps, id?: string): User<UserProps> {
    const user = new User(props, id);
    return user;
  }

  static from(props: UserProps, id?: string): User<UserProps> {
    const user = new User(props, id);
    return user;
  }

  login(): void {
    this.props.isLoggedIn = true;
    this.props.updatedAt = new Date();
    this.props.lastLoginAt = new Date();
  }

  logout(): void {
    this.props.isLoggedIn = false;
    this.props.updatedAt = new Date();
  }
}
