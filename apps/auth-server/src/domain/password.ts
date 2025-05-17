import { ValueObject } from '@app/common/base/value-object';
import * as bcrypt from 'bcrypt';

interface PasswordProps {
  value: string;
}

export class Password extends ValueObject<PasswordProps> {
  get value(): string {
    return this.props.value;
  }

  private constructor(props: PasswordProps) {
    super(props);
  }

  static async create(password: string): Promise<Password> {
    const hashedPassword = await bcrypt.hash(password, 10);
    return new Password({ value: hashedPassword });
  }

  static from(password: string): Password {
    return new Password({ value: password });
  }
}
