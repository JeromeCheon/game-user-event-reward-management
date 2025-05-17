import { MapleJobInfo } from '@app/common/variable/maple-job-info';
import { User, UserProps } from './user';

interface OperatorProps extends UserProps {
  level: number;
  job: MapleJobInfo;
}

export class Operator extends User<OperatorProps> {
  private constructor(props: OperatorProps, id?: string) {
    super(props, id);
  }

  static create(props: OperatorProps, id?: string): Operator {
    const user = new Operator(props, id);
    return user;
  }

  static from(props: OperatorProps, id?: string): Operator {
    const user = new Operator(props, id);
    return user;
  }

  get level(): number {
    return this.props.level;
  }

  get job(): MapleJobInfo {
    return this.props.job;
  }
}
