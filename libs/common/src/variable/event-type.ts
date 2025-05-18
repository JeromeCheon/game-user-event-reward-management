export enum EventType {
  ANNIVERSARY_22ND = 'anniversary_22nd',
  ATTENDANCE = 'attendance',
  RECOMMEND_FRIEND = 'recommend_friend',
  WELCOME_BACK = 'welcome_back',
  SUMMER_VACATION_2025 = 'summer_vacation_2025',
  CHUSEOK_2025 = 'chuseok_2025',
}

export enum EventConditionType {
  RECOMMEND_COUNT = 'recommend_count',
  LOGIN_COUNT = 'login_count',
  STAY_TIME = 'stay_time',
}

export enum EventComparisonOp {
  EQUAL = 'equal',
  GT = 'gt',
  LT = 'lt',
  GTE = 'gte',
  LTE = 'lte',
}
