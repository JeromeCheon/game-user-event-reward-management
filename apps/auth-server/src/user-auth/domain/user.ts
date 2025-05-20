import { AggregateRoot } from '@app/common/base/aggregate-root';
import { Role } from '@app/common/variable/role';
import { Password } from './password';
import { WorldServerType } from '@app/common/variable/world-server-type';
import { MapleJobInfo } from '@app/common/variable/maple-job-info';

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
  level?: number;
  job?: MapleJobInfo;
  isBanned?: boolean;
}

export class User extends AggregateRoot<UserProps> {
  protected constructor(props: UserProps, id?: string) {
    super(props, id);
  }

  get account() {
    return this.props.account;
  }

  get password() {
    return this.props.password;
  }

  get name() {
    return this.props.name;
  }

  get role() {
    return this.props.role;
  }

  get baseServer() {
    return this.props.baseServer;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }

  get isLoggedIn() {
    return this.props.isLoggedIn;
  }

  get lastLoginAt() {
    return this.props.lastLoginAt;
  }

  get level() {
    return this.props.level;
  }

  get job() {
    return this.props.job;
  }

  get isBanned() {
    return this.props.isBanned;
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

  static create(props: UserProps, id?: string): User {
    return new User(props, id);
  }

  static from(props: UserProps, id?: string): User {
    return new User(props, id);
  }

  static createAdmin(
    props: Omit<UserProps, 'role' | 'level' | 'job' | 'isBanned'>,
    id?: string,
  ): User {
    return new User(
      {
        ...props,
        role: Role.ADMIN,
      },
      id,
    );
  }

  static createAuditor(
    props: Omit<UserProps, 'role' | 'level' | 'job' | 'isBanned'>,
    id?: string,
  ): User {
    return new User(
      {
        ...props,
        role: Role.AUDITOR,
      },
      id,
    );
  }

  static createOperator(
    props: Omit<UserProps, 'role' | 'isBanned'> & {
      level: number;
      job: MapleJobInfo;
    },
    id?: string,
  ): User {
    return new User(
      {
        ...props,
        role: Role.OPERATOR,
      },
      id,
    );
  }

  static createGameUser(
    props: Omit<UserProps, 'role'> & {
      level: number;
      job: MapleJobInfo;
      isBanned: boolean;
    },
    id?: string,
  ): User {
    return new User(
      {
        ...props,
        role: Role.USER,
      },
      id,
    );
  }
}
