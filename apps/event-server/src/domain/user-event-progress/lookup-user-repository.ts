export const LOOKUP_USER_REPOSITORY = Symbol('LOOKUP_USER_REPOSITORY');

export interface LookupUserRepository {
  getUserIdsExceptBanned(): Promise<string[]>;
  getUserLevelById(userId: string): Promise<number>;
}
