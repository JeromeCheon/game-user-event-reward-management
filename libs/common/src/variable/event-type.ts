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

export enum EventRewardClaimHistoryResult {
  APPROVED = 'approved',
  REJECTED = 'rejected',
}

export enum EventRewardClaimHistoryReason {
  NOT_ENOUGH_LEVEL = 'not_enough_level',
  NOT_MEET_CONDITION = 'not_meet_condition',
  NOT_FOUND_EVENT = 'not_found_event',
  INVALID_USER_EVENT_PROGRESS = 'invalid_user_event_progress',
  DUPLICATE_CLAIM = 'duplicate_claim',
  QUALIFIED = 'qualified', // for approved case
}
