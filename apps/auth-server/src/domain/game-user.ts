import { MapleJobInfo } from '@app/common/variable/maple-job-info';
import { User, UserProps } from './user';

interface GameUserProps extends UserProps {
  level: number;
  job: MapleJobInfo;
  recommandorAccount?: string;
  isBanned: boolean;
}

export class GameUser extends User<GameUserProps> {
  private constructor(props: GameUserProps, id?: string) {
    super(props, id);
  }

  static create(props: GameUserProps, id?: string): GameUser {
    const gameUser = new GameUser(props, id);
    return gameUser;
  }

  static from(props: GameUserProps, id?: string): GameUser {
    const gameUser = new GameUser(props, id);
    return gameUser;
  }

  get level(): number {
    return this.props.level;
  }

  get job(): MapleJobInfo {
    return this.props.job;
  }

  get recommandorAccount(): string | undefined {
    return this.props.recommandorAccount;
  }

  get isBanned(): boolean {
    return this.props.isBanned;
  }
}
