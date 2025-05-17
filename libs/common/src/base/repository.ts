export interface Repository<T> {
  insert(entity: T): Promise<void>;
  update(entity: T): Promise<void>;
}
