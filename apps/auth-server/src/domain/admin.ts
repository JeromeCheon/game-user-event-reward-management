import { User, UserProps } from './user';

export class Admin extends User<UserProps> {
  private constructor(props: UserProps, id?: string) {
    super(props, id);
  }

  static create(props: UserProps, id?: string): Admin {
    const user = new Admin(props, id);
    return user;
  }

  static from(props: UserProps, id?: string): Admin {
    const user = new Admin(props, id);
    return user;
  }
}
