export enum MapleJobType {
  BEGINNER = 'beginner',
  WORRIER = 'worrier',
  BOWMAN = 'bowman',
  MAGICIAN = 'magician',
  THIEF = 'thief',
}

export enum MapleJobTitle {
  BEGINNER = 'beginner',
  FIGHTER = 'fighter',
  ARCHER = 'archer',
  WIZARD = 'wizard',
  ASSASSIN = 'assassin',
}

export class MapleJobInfo {
  type: MapleJobType;

  title: MapleJobTitle;

  degree: 0 | 1 | 2 | 3 | 4 | 5;
}
