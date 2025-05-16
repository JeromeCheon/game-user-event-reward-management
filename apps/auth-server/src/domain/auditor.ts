import { User, UserProps } from './user';

export class Auditor extends User<UserProps> {
  private constructor(props: UserProps, id?: string) {
    super(props, id);
  }

  static create(props: UserProps, id?: string): Auditor {
    const user = new Auditor(props, id);
    return user;
  }

  static from(props: UserProps, id?: string): Auditor {
    const user = new Auditor(props, id);
    return user;
  }
}
